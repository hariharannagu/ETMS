// Frontend Logic for Employee Time Management

let employeeId = '';
let employeeName = '';
let loginTime = '';
let breakInTime = '';
let breakOutTime = '';
let logoutTime = '';
let totalTime = '';

// DOM elements
const employeeIdInput = document.getElementById('employeeId');
const employeeNameInput = document.getElementById('employeeName');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const breakInBtn = document.getElementById('breakInBtn');
const breakOutBtn = document.getElementById('breakOutBtn');
const timeDetails = document.getElementById('timeDetails');
const reportSection = document.getElementById('reportSection');
const reportTable = document.getElementById('reportTable');
const viewReportBtn = document.getElementById('viewReportBtn');

// Event listeners
loginBtn.addEventListener('click', () => {
  loginTime = new Date().toLocaleTimeString();
  updateTimeLogsDisplay();
});

logoutBtn.addEventListener('click', () => {
  logoutTime = new Date().toLocaleTimeString();
  totalTime = calculateTotalTime();
  saveTimeLogsToBackend();
  updateTimeLogsDisplay();
});

breakInBtn.addEventListener('click', () => {
  breakInTime = new Date().toLocaleTimeString();
  updateTimeLogsDisplay();
});

breakOutBtn.addEventListener('click', () => {
  breakOutTime = new Date().toLocaleTimeString();
  updateTimeLogsDisplay();
});

viewReportBtn.addEventListener('click', fetchTimeLogs);

// Helper functions
function updateTimeLogsDisplay() {
  document.getElementById('loginTime').textContent = loginTime;
  document.getElementById('breakInTime').textContent = breakInTime || 'Not on break';
  document.getElementById('breakOutTime').textContent = breakOutTime || 'Not on break';
  document.getElementById('logoutTime').textContent = logoutTime || 'Not logged out';
  document.getElementById('totalTime').textContent = totalTime || 'Not calculated yet';
  timeDetails.style.display = 'block';
}

function calculateTotalTime() {
  // This function calculates the total time, including break times
  if (loginTime && logoutTime) {
    const loginDate = new Date(`1970-01-01T${loginTime}`);
    const logoutDate = new Date(`1970-01-01T${logoutTime}`);
    const totalTimeInMs = logoutDate - loginDate;
    return new Date(totalTimeInMs).toISOString().substr(11, 8); // Format the result as HH:MM:SS
  }
  return '0';
}

function saveTimeLogsToBackend() {
  const timeLogData = {
    employeeId,
    employeeName,
    loginTime,
    breakInTime,
    breakOutTime,
    logoutTime,
    totalTime,
  };

  fetch('http://localhost:3000/api/time-log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeLogData),
  })
    .then((response) => response.json())
    .then(() => alert('Time log saved successfully!'))
    .catch((err) => console.error('Error saving time log:', err));
}

function fetchTimeLogs() {
  fetch('http://localhost:3000/api/time-log')
    .then((response) => response.json())
    .then((logs) => {
      reportSection.style.display = 'block';
      reportTable.innerHTML = logs
        .map(
          (log) =>
            `<p>Employee: ${log.employeeName} | Login: ${log.loginTime} | Break In: ${log.breakInTime || 'N/A'} | Break Out: ${log.breakOutTime || 'N/A'} | Logout: ${log.logoutTime} | Total: ${log.totalTime}</p>`
        )
        .join('');
    });
}
