import { NextRequest, NextResponse } from 'next/server';

const ELECTRICITY_MAPS_API_TOKEN = "czG7nq1wv9OHi1phrXUn"; // Store in environment variable in production

export async function GET() {
  try {
    console.log('🔄 Fetching power breakdown data from Electricity Maps API');
    
    const response = await fetch(
      'https://api.electricitymap.org/v3/power-breakdown/history?zone=PT',
      {
        method: 'GET',
        headers: {
          'auth-token': ELECTRICITY_MAPS_API_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('❌ Electricity Maps API response not ok:', response.status);
      return NextResponse.json(
        { error: `Electricity Maps API responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Successfully fetched power breakdown data');
    
    // Process and structure the data for easier frontend consumption
    const processedData = {
      zone: data.zone,
      history: data.history.map((entry: any) => ({
        datetime: entry.datetime,
        powerConsumptionBreakdown: entry.powerConsumptionBreakdown,
        powerProductionBreakdown: entry.powerProductionBreakdown,
        powerImportBreakdown: entry.powerImportBreakdown,
        powerExportBreakdown: entry.powerExportBreakdown,
        fossilFreePercentage: entry.fossilFreePercentage,
        renewablePercentage: entry.renewablePercentage,
        powerConsumptionTotal: entry.powerConsumptionTotal,
        powerProductionTotal: entry.powerProductionTotal,
        powerImportTotal: entry.powerImportTotal,
        powerExportTotal: entry.powerExportTotal,
        isEstimated: entry.isEstimated,
      })),
      // Get the latest entry for current values
      latest: data.history[data.history.length - 1],
    };
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('❌ Error fetching power breakdown data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch power breakdown data' },
      { status: 500 }
    );
  }
}
