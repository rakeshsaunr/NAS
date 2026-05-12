const ServiceModel = require('../models/servicecall-model');

class ServiceRepository {
    // Create a new individual call attend / call sheet
    async createCallSheet(data) {
        try {
            const callSheet = await ServiceModel.create(data);
            return callSheet;
        } catch (error) {
            throw new Error('Error creating call sheet: ' + error.message);
        }
    }

    // Get all call sheets
    async getAllCallSheets() {
        try {
            return await ServiceModel.find({});
        } catch (error) {
            throw new Error('Error fetching call sheets: ' + error.message);
        }
    }

    // Get a single call sheet by ID
    async getCallSheetById(id) {
        try {
            return await ServiceModel.findById(id);
        } catch (error) {
            throw new Error('Error fetching call sheet: ' + error.message);
        }
    }

    // Update a call sheet by ID
    async updateCallSheet(id, data) {
        try {
            return await ServiceModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error('Error updating call sheet: ' + error.message);
        }
    }

    // Delete a call sheet by ID
    async deleteCallSheet(id) {
        try {
            return await ServiceModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting call sheet: ' + error.message);
        }
    }
}

module.exports = new ServiceRepository();