import { Request, Response } from 'express'
import Client from 'models/client'
import MyRequest from 'types/myreq'
import scheduler from 'node-schedule'
import sendEmail from 'services/email'

export const createClient = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, age, goal, coachId } = req.body
        const newClient = await Client.create({
            name,
            email,
            phone,
            age,
            goal,
            coachId,
        })
        res.status(201).json({
            message: 'Client created successfully',
            client: newClient,
        })
    } catch {
        res.status(500).json({ message: 'Error creating client' })
    }
}

export const getClientsForCoach = async (req: Request, res: Response) => {
    try {
        const { coachId } = req.params
        const clients = await Client.find({ coachId })
        res.status(200).json({ clients })
    } catch {
        res.status(500).json({ message: 'Error retrieving clients' })
    }
}

export const updateClientProgress = async (req: MyRequest, res: Response) => {
    try {
        const { id } = req.params
        const { progressNotes, lastUpdated, weight, bmi } = req.body

        const client = await Client.findOne({ coachId: req.user?.id, _id: id })
        if (!client) {
            res.status(401).json({ message: 'Unauthorized' })
        } else {
            const fieldsToBeUpdated: Partial<{
                progressNotes: string
                lastUpdated: Date
                weight: number
                bmi: number
            }> = { progressNotes, lastUpdated, weight, bmi }
                ; (
                    ['progressNotes', 'lastUpdated', 'weight', 'bmi'] as const
                ).forEach((field) => {
                    if (fieldsToBeUpdated[field] !== undefined) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ; (client as any)[field] = fieldsToBeUpdated[field]
                    }
                })

            await client.save()
            res.status(200).json({
                message: 'Client progress updated successfully',
                client,
            })
        }
    } catch {
        res.status(500).json({ message: 'Error updating client progress' })
    }
}

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Client.deleteOne({ _id: id })
        res.status(200).json({ message: 'Client deleted successfully' })
    } catch {
        res.status(500).json({ message: 'Error deleting client' })
    }
}

export const scheduleSession = async (req: MyRequest, res: Response) => {
    try {
        const { id } = req.params
        const { date, time, sessionType } = req.body
        const client = await Client.findById(id)

        if (!client) {
            res.status(404).json({ message: 'No client found with this id' })
        } else {
            if (client.coachId.toString() != req.user?.id) {
                res.status(401).json({ message: 'Unauthorized' })
            } else {
                const dateTime = new Date(`${date}T${time}`)
                client.sessions?.push({ dateTime, sessionType })
                await client.save()
                if (sessionType === 'Follow-up') {
                    const reminderTime = new Date(dateTime)
                    reminderTime.setHours(reminderTime.getHours() - 24)
                    // Schedule the cron job
                    scheduler.scheduleJob(reminderTime, async () => {
                        if (reminderTime.getTime() > Date.now()) return
                        const client = await Client.findById(id)
                        if (!client || !client.email) return

                        // Send reminder email to the client
                        await sendEmail(
                            client.email,
                            'Session Reminder',
                            `Hello ${client.name},\n\nThis is a reminder for your upcoming session scheduled on ${dateTime.toLocaleString()}.\n\nBest regards,\nWellnessX`,
                            () =>
                                console.log(
                                    'something went wrong while sending email 📨 👎'
                                )
                        )
                    })
                }
                sendEmail(
                    client.email,
                    'New session',
                    `New ${sessionType} is scheduled`,
                    () =>
                        console.log(
                            'something went wrong while sending email 📨 👎'
                        )
                )
                res.status(201).json({
                    message: 'Session scheduled successfully',
                })
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error scheduling session' })
    }
}
