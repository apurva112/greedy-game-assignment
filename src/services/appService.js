import baseService from "./baseService";

const appService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getApps: build.query({
      query: () => ({
        url: `apps`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAppsQuery } = appService;

export default appService;
