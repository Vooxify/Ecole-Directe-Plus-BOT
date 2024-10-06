module.exports = (req, res) => {
    const { name, age } = req.body;

    // Vérifiez si les données nécessaires sont présentes
    if (!name || !age) {
        return res.status(400).json({ error: "Name and age are required" });
    }

    // Traitez les données et retournez une réponse
    const response = {
        message: `Hello, ${name}! You are ${age} years old.`,
        receivedData: {
            name,
            age,
        },
    };

    res.status(200).json(response);
};
