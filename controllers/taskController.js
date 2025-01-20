const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching taks'});
    }
};

exports.createTask = async (req, res) => {
    const { title, color } = req.body
    try {
        const newTask = await prisma.task.create({
            data: {title, color},
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, color, completed},
        });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
}