import { Request, Response } from 'express'
import Client from 'models/client'

export const getAdminDashboard = async (req: Request, res: Response) => {
    try {
        const stats = await Client.aggregate([
            {
                $match: {},
            },
            {
                $group: {
                    _id: '$coachId',
                    clientCount: { $sum: 1 },
                    activeClientCount: {
                        $sum: {
                            $cond: [
                                {
                                    $gt: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: '$sessions',
                                                    as: 'session',
                                                    cond: {
                                                        $gt: [
                                                            '$$session.date',
                                                            new Date(),
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    totalWeight: { $sum: '$weight' },
                    totalWeightRecords: {
                        $sum: {
                            $cond: [{ $ifNull: ['$weight', false] }, 1, 0],
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalClients: { $sum: '$clientCount' },
                    activeClients: { $sum: '$activeClientCount' },
                    totalCoaches: { $sum: 1 },
                    avgClientsPerCoach: { $avg: '$clientCount' },
                    avgWeight: {
                        $avg: {
                            $cond: {
                                if: { $eq: ['$totalWeightRecords', 0] },
                                then: 0,
                                else: { $divide: ['$totalWeight', '$totalWeightRecords'] }
                            }
                        }
                    }
                },
            },
        ])

        const result = stats[0] || {
            totalClients: 0,
            activeClients: 0,
            totalCoaches: 0,
            avgClientsPerCoach: 0,
            avgWeight: 0,
        }

        res.status(200).json({
            totalClients: result.totalClients,
            activeClients: result.activeClients,
            totalCoaches: result.totalCoaches,
            avgClientsPerCoach: result.avgClientsPerCoach,
            avgWeight: result.avgWeight,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error retrieving dashboard data' })
    }
}
