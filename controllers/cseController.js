import CSE from "../models/cse.model.js";

export const viewCseSubs = async (req, res) => {
    try{
        const subDetails = await CSE.find();
        res.status(200).json(subDetails);
    } catch(error) {
        console.error('Error fetching subjects detail from DB', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching subjects detail from DB',
            error: error.message,
        })
    }
};

export const searchCseSubs = async (req, res) => {
    try {
        const { sub } = req.query;
        const query = sub.toUpperCase();
        const response = await CSE.findOne({ subCode: query });
        if (response) {
            return res.status(200).json({
                status: true,
                response
            });
        }
        return res.status(404).json({
            status: false,
            message: 'Subject not found in the database.',
        });
    } catch (error) {
        console.error('Error searching the subject from the database:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error. Unable to search for the subject.',
        });
    }
};

export const checkCseDuplicate = async (req, res) => {
    try {
        const { subCode } = req.query;
        const response = await CSE.findOne({ "subCode": subCode.toUpperCase() });
        if(response){
            res.status(201).json({
                success: true,
                message: "Sub Code already exists",
            })
        } else{
            res.status(201).json({
                success: false,
                message: "Sub Code is unique",
            })
        }
    } catch(error){
        console.error("Error Checking Duplicate sub code", error);
        res.status(500).json({
            success: false,
        })
    }
};

export const updateTable = async (req, res) => {
    try {
        const { subCode, subYear, subSem, docLink } = req.body;
        if (!subCode || !subYear || !subSem || !docLink) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const updateField = `year${subYear}.${subSem}`;
        const updatedSubject = await CSE.findOneAndUpdate(
            { subCode }, 
            { $set: { [updateField]: docLink } }, 
            { new: true }
        );
        if (!updatedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({
            success: true,
            message: "Document link updated successfully",
            updatedSubject
        });
    } catch (err) {
        console.error("Error updating Subject Table Details:", err);
        res.status(500).json({
            success: false,
            message: "Error updating Subject Table Details"
        });
    }
}

export const deleteTable = async (req, res) => {
    try {
        const { subCode, subYear, subSem, docLink } = req.body;
        if (!subCode || !subYear || !subSem || !docLink) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const updateField = `year${subYear}.${subSem}`;
        const updatedSubject = await CSE.findOneAndUpdate(
            { subCode }, 
            { $set: { [updateField]: ' ' } }, 
            { new: true }
        );
        if (!updatedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({
            success: true,
            message: "Document link updated successfully",
            updatedSubject
        });
    } catch (err) {
        console.error("Error updating Subject Table Details:", err);
        res.status(500).json({
            success: false,
            message: "Error updating Subject Table Details"
        });
    }
}

export const addCseSubs = async (req, res) => {
    try {
        const { subCode, subName, year2025,  midSem2025, endSem2025, year2024, midSem2024, endSem2024, year2023, midSem2023, endSem2023, year2022, midSem2022, endSem2022 } = req.body;
        const subject = await CSE.create({
            "subCode": subCode.toUpperCase(),
            "subName": subName,
            year2025: { year: year2025, midSem: midSem2025, endSem: endSem2025 },
            year2024: { year: year2024, midSem: midSem2024, endSem: endSem2024 },
            year2023: { year: year2023, midSem: midSem2023, endSem: endSem2023 },
            year2022: { year: year2022, midSem: midSem2022, endSem: endSem2022 },
        });
        res.status(201).json({
            success: true,
            subject,
        });
    } catch (error) {
        console.log('Error adding subjects to DB', error)
        res.status(500).json({
            success: false,
        })
    }
};
