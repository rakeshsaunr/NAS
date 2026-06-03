// repositories/enquiry-repository.js

import Enquiry from "../models/enquiry-model.js";

export const createEnquiryRepository = async (data) => {
  return Enquiry.create(data);
};

export const getAllEnquiriesRepository = async () => {
  return Enquiry.find().sort({ createdAt: -1 });
};

export const getSingleEnquiryRepository = async (id) => {
  return Enquiry.findById(id);
};

export const updateEnquiryStatusRepository = async (id, status) => {
  return Enquiry.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

export const deleteEnquiryRepository = async (id) => {
  return Enquiry.findByIdAndDelete(id);
};