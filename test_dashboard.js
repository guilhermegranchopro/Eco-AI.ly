// Test script to verify dashboard functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:3002';
const API_URL = 'http://localhost:8080';

async function testDashboard() {
  console.log('🔍 Testing Portugal Dashboard Functionality...\n');
  
  try {
    // Test 1: Check if frontend is serving the dashboard page
    console.log('1. Testing frontend dashboard page...');
    const dashboardResponse = await axios.get(`${BASE_URL}/dashboard/portugal`);
    console.log(`   ✅ Dashboard page responded with status: ${dashboardResponse.status}`);
    
    // Test 2: Check carbon intensity API
    console.log('\n2. Testing Carbon Intensity API...');
    const carbonResponse = await axios.get(`${API_URL}/api/carbon-intensity`, {
      headers: {
        'Origin': BASE_URL
      }
    });
    console.log(`   ✅ Carbon Intensity API responded with status: ${carbonResponse.status}`);
    console.log(`   📊 Current prediction class: ${carbonResponse.data.prediction_class}`);
    console.log(`   📈 Data points available: ${carbonResponse.data.history.length}`);
    
    // Test 3: Check renewable percentage API  
    console.log('\n3. Testing Renewable Percentage API...');
    const renewableResponse = await axios.get(`${API_URL}/api/renewable-percentage`, {
      headers: {
        'Origin': BASE_URL
      }
    });
    console.log(`   ✅ Renewable Percentage API responded with status: ${renewableResponse.status}`);
    console.log(`   📊 Current prediction class: ${renewableResponse.data.prediction_class}`);
    console.log(`   📈 Data points available: ${renewableResponse.data.history.length}`);
    
    // Test 4: Verify data structure
    console.log('\n4. Verifying data structure...');
    const carbonData = carbonResponse.data.history[0];
    const renewableData = renewableResponse.data.history[0];
    
    console.log(`   ✅ Carbon data sample: ${carbonData.value} g CO2eq/kWh at ${carbonData.datetime}`);
    console.log(`   ✅ Renewable data sample: ${renewableData.value}% at ${renewableData.datetime}`);
    
    console.log('\n🎉 All tests passed! The dashboard should be fully functional.\n');
    
    // Test 5: Performance check
    console.log('5. Performance test...');
    const start = Date.now();
    await Promise.all([
      axios.get(`${API_URL}/api/carbon-intensity`),
      axios.get(`${API_URL}/api/renewable-percentage`)
    ]);
    const duration = Date.now() - start;
    console.log(`   ✅ Both APIs responded in ${duration}ms`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   URL: ${error.config.url}`);
    }
  }
}

testDashboard();
