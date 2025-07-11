const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
  return 'connection' in navigator &&
    (navigator as any)['connection'] &&
    'effectiveType' in (navigator as any)['connection']
    ? (navigator as any)['connection']['effectiveType']
    : '';
}

export interface Metric {
  id: string;
  name: string;
  value: number;
}

export function sendToVercelAnalytics(metric: Metric) {
  const analyticsId = process.env.REACT_APP_VERCEL_ANALYTICS_ID;
  if (!analyticsId) {
    return;
  }

  const body: Record<string, string> = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
}

