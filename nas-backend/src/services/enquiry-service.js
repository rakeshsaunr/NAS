// services/enquiry-service.js

import {
  createEnquiryRepository,
  getAllEnquiriesRepository,
  getSingleEnquiryRepository,
  updateEnquiryStatusRepository,
  deleteEnquiryRepository,
} from "../repositories/enquiry-repository.js";

export const createEnquiryService = async (body) => {
  return createEnquiryRepository(body);
};

export const getAllEnquiriesService = async () => {
  return getAllEnquiriesRepository();
};

export const getSingleEnquiryService = async (id) => {
  return getSingleEnquiryRepository(id);
};

export const updateEnquiryStatusService = async (id, status) => {
  return updateEnquiryStatusRepository(id, status);
};

export const deleteEnquiryService = async (id) => {
  return deleteEnquiryRepository(id);
};