export default function generateFilters(data) {
  const filter = data.reduce((current, d, index) => {
    return {
      requests: {
        max:
          current.requests?.max > d.requests
            ? current.requests?.max
            : d.requests,
        min: 0,
        currentMax:
          current.requests?.max > d.requests
            ? current.requests?.max
            : d.requests,
        currentMin: 0,
      },
      responses: {
        max:
          current.responses?.max > d.responses
            ? current.responses?.max
            : d.responses,
        min: 0,
        currentMax:
          current.responses?.max > d.responses
            ? current.responses?.max
            : d.responses,
        currentMin: 0,
      },
      clicks: {
        max: current.clicks?.max > d.clicks ? current.clicks?.max : d.clicks,
        min: 0,
        currentMax:
          current.clicks?.max > d.clicks ? current.clicks?.max : d.clicks,

        currentMin: 0,
      },
      ctr: {
        max: current.ctr?.max > d.ctr ? current.ctr?.max : d.ctr,
        min: 0,
        currentMax: current.ctr?.max > d.ctr ? current.ctr?.max : d.ctr,

        currentMin: 0,
      },
      impressions: {
        max:
          current.impressions?.max > d.impressions
            ? current.impressions?.max
            : d.impressions,
        min: 0,
        currentMax:
          current.impressions?.max > d.impressions
            ? current.impressions?.max
            : d.impressions,

        currentMin: 0,
      },
      revenue: {
        max:
          current.revenue?.max > d.revenue ? current.revenue?.max : d.revenue,
        min: 0,
        currentMax:
          current.revenue?.max > d.revenue ? current.revenue?.max : d.revenue,

        currentMin: 0,
      },
      fill_rate: {
        max:
          current.fill_rate?.max > d.fill_rate
            ? current.fill_rate?.max
            : d.fill_rate,
        min: 0,
        currentMax:
          current.fill_rate?.max > d.fill_rate
            ? current.fill_rate?.max
            : d.fill_rate,

        currentMin: 0,
      },
    };
  }, {});
  return filter;
}
