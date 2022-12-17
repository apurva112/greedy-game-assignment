import baseService from "./baseService";

const reportService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query({
      query: ({ startDate, endDate }) => ({
        url: `report`,
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetReportQuery } = reportService;

export default reportService;
