import IT from "../models/it.model.js";

export const viewItSubs = async (req, res) => {
    try{
        const subDetails = await IT.find();
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

export const searchItSubs = async (req, res) => {
    try {
        const { subCode } = req.query;
        const response = await IT.findOne({ subCode: subCode });
        if (response) {
            return res.status(200).json({
                status: true,
                response
            });
        }
        return res.status(200).json({
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

export const checkItDuplicate = async (req, res) => {
    try {
        const { subCode } = req.query;
        const response = await IT.findOne({ "subCode": subCode.toUpperCase() });
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

export const addItSubs = async (req, res) => {
    try {
        const { subCode, subName, year2025,  midSem2025, endSem2025, year2024, midSem2024, endSem2024, year2023, midSem2023, endSem2023, year2022, midSem2022, endSem2022 } = req.body;
        const subject = await IT.create({
            "subCode": subCode,
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