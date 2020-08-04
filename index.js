const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
const YEAR = 2021;
const ITEM_COUNT = 3;

function buildItemTable(itemCount) {
  var table = document.createElement('table');
  for (let index = 0; index < itemCount; index++) {
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    cell.innerHTML = index+1;
    cell.classList.add('item-cell');
    if(index == itemCount - 1)
      cell.classList.add('item-cell-last');
    row.appendChild(cell);
    table.appendChild(row);
  }
  table.classList.add('item-table');
  return table;
}

function buildMonthRow(number, year) {
  var row = document.createElement('tr');
  var cell = document.createElement('th');
  cell.colSpan = 7;
  cell.innerHTML = MONTH[number] + " " + year;
  cell.classList.add('month');
  row.appendChild(cell);
  return row;
}

function buildWeekDayRow() {
  var row = document.createElement('tr');
  for (let index = 0; index < 7; index++) {
    var cell = document.createElement('th');
    cell.innerHTML = WEEKDAY[index];
    cell.classList.add('weekday');
    row.appendChild(cell);
  }
  return row;
}

function buildDateText(date) {
  var node = document.createElement('div');
  node.innerHTML = date;
  node.classList.add('date-text');
  return node;
}

function appendMonthBody(table, year, month) {
  var date = 1;
  var rows = []
  var firstDay = (new Date(year, month)).getDay();
  var daysInMonth = 32 - new Date(year, month, 32).getDate();
  
  for (let i = 0; i < 6; i++) {
    // break to avoid adding an empty row
    if (date > daysInMonth) break;

    var row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || (date > daysInMonth)) {
        var cell = document.createElement('td');
        cell.classList.add('date');
        row.appendChild(cell);
      } else {
        var cell = document.createElement('td');
        cell.classList.add('date');
        cell.appendChild(buildDateText(date));
        cell.appendChild(buildItemTable(itemCount || ITEM_COUNT));
        row.appendChild(cell);
        date++;
      }
    }
    table.appendChild(row);
  }
}

function buildPageBreak() {
  var para = document.createElement('p');
  para.style="page-break-before: always";
  return para;
}

function buildTableFooter(footerText) {
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.colSpan = 7;
  cell.innerHTML = footerText;
  cell.classList.add('footer');
  row.appendChild(cell);
  return row;
}

function buildMonthlyTable(year, footerText) {
  var container = document.getElementById('container');
  for (let index = 0; index < 12; index++) {
    var table = document.createElement('table');

    var tableHead = document.createElement('thead');
    tableHead.appendChild(buildMonthRow(index, year));
    tableHead.appendChild(buildWeekDayRow());
    table.appendChild(tableHead);
    
    var tableBody = document.createElement('tbody');
    appendMonthBody(tableBody, year, index);
    table.appendChild(tableBody);
    
    if(footerText) {
      var tableFoot = document.createElement('tfoot');
      tableFoot.appendChild(buildTableFooter(footerText));
      table.appendChild(tableFoot);
    }

    container.appendChild(table);
    container.appendChild(buildPageBreak());
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const year = getParameterByName("year", location.href)
const itemCount = getParameterByName("item_count", location.href)
const footerText = getParameterByName("footer", location.href)
buildMonthlyTable(year || YEAR, footerText);