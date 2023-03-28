//Events data
let events = [
  {
    dateFrom: '2020-01-03',
    dateTo: '2020-01-12',
    description: 'ATP Cup'
  },
  {
    dateFrom: '2020-01-20',
    dateTo: '2020-02-03',
    description: 'Australian Open'
  },
  {
    dateFrom: '2020-02-03',
    dateTo: '2020-02-09',
    description: 'Cordoba Open'
  },
  {
    dateFrom: '2020-02-10',
    dateTo: '2020-02-16',
    description: 'New York Open'
  },
  {
    dateFrom: '2020-03-17',
    dateTo: '2020-03-17',
    description: 'Saint Patrick\'s Day'
  },
  {
    dateFrom: '2020-03-25',
    dateTo: '2020-04-05',
    description: 'Miami Open presneted by Itau'
  },
  {
    dateFrom: '2020-05-11',
    dateTo: '2020-05-17',
    description: 'ATP Master Tennis'
  },
  {
    dateFrom: '2020-05-21',
    dateTo: '2020-05-21',
    description: 'Arena Zagreb'
  },
  {
    dateFrom: '2020-05-23',
    dateTo: '2020-05-23',
    description: 'Gwardia Stadium'
  },
  {
    dateFrom: '2020-05-24',
    dateTo: '2020-06-07',
    description: 'French Open'
  },
  {
    dateFrom: '2021-06-08',
    dateTo: '2021-06-14',
    description: 'Mercedess Cup'
  },
  {
    dateFrom: '2020-06-21',
    dateTo: '2020-07-04',
    description: 'Wimbledon'
  },
  {
    dateFrom: '2020-07-08',
    dateTo: '2020-07-08',
    description: 'Estadio Jose Zorila'
  },
  {
    dateFrom: '2020-07-11',
    dateTo: '2020-07-11',
    description: 'Bessa Stadium'
  },
  {
    dateFrom: '2020-07-12',
    dateTo: '2020-07-12',
    description: 'Estadio Olimpico - Seville'
  },
  {
    dateFrom: '2020-07-18',
    dateTo: '2020-07-26',
    description: 'Indianopolis Tennis Championships'
  },
  {
    dateFrom: '2020-07-27',
    dateTo: '2020-08-01',
    description: 'Countrywide Classic Tennis'
  },
  {
    dateFrom: '2020-08-03',
    dateTo: '2020-08-03',
    description: 'Madison Square Garden'
  },
  {
    dateFrom: '2020-08-05',
    dateTo: '2020-08-05',
    description: 'Happy Birthday John!'
  },
  {
    dateFrom: '2021-08-10',
    dateTo: '2021-08-16',
    description: 'Rodgers Cup'
  },
  {
    dateFrom: '2020-08-07',
    dateTo: '2020-08-11',
    description: 'Western & Southern Financial Group Women\'s Open'
  },
  {
    dateFrom: '2020-08-15',
    dateTo: '2020-08-23',
    description: 'Rogers Cup Women\'s Tennis'
  },
  {
    dateFrom: '2020-08-29',
    dateTo: '2020-09-10',
    description: 'US Open Tennis Championship'
  },
  {
    dateFrom: '2020-10-31',
    dateTo: '2020-10-31',
    description: 'Konig Pilsener Arena'
  },
  {
    dateFrom: '2020-11-01',
    dateTo: '2020-11-01',
    description: 'AWD Dome'
  },
  {
    dateFrom: '2020-11-07',
    dateTo: '2020-11-07',
    description: 'SAP Arena'
  },
  {
    dateFrom: '2020-11-12',
    dateTo: '2020-11-12',
    description: 'Recinto Ferial - Valencia'
  },
  {
    dateFrom: '2020-11-22',
    dateTo: '2020-11-27',
    description: 'Barclays ATP World Tour Finals'
  },
  {
    dateFrom: '2020-12-01',
    dateTo: '2020-12-01',
    description: 'Arena Nurnberg'
  },
  {
    dateFrom: '2020-12-12',
    dateTo: '2020-12-12',
    description: 'Scottish Exhibition & Conference Center'
  },
  {
    dateFrom: '2020-12-19',
    dateTo: '2020-12-21',
    description: 'International Horse Show'
  },
  {
    dateFrom: '2020-12-24',
    dateTo: '2020-12-26',
    description: 'Merry Christmas !'
  },
  {
    dateFrom: '2020-12-27',
    dateTo: '2020-12-30',
    description: 'Peter Pan'
  },
];
//Handles Events Data
function getImportantDates(dataSource) {
  let dates = [];
  if (!dataSource) {
    dataSource = events;
  }
  for (let i = 0; i < dataSource.length; i++) {
    const event = dataSource[i];
    let dateFrom = new Date(event.dateFrom), dateTo = new Date(event.dateTo);
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(0, 0, 0, 0);
    while (dateFrom.getTime() < dateTo.getTime()) {
      dates.push({ date: new Date(dateFrom), description: event.description });
      dateFrom.setDate(dateFrom.getDate() + 1);
      dateFrom.setHours(0, 0, 0, 0);
    }
    dates.push({ date: new Date(dateTo), description: event.description });
  }
  return dates;
}
//Returns an event based on it's Date
function getImportantDate(date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  const event = importantDatesData.find(dateObj => dateObj.date.getTime() === date.getTime());
  if (!event) {
    return;
  }
  const eventDates = importantDatesData.filter(dateObj => dateObj.description === event.description);
  if (eventDates.length) {
    return { from: eventDates[0].date, to: eventDates[eventDates.length - 1].date, description: event.description };
  }
}
let importantDatesData = getImportantDates();
window.Smart('#calendar', class {
  get properties() {
    return {
      months: 12,
      firstDayOfWeek: 1,
      importantDates: importantDatesData.map((dateObj) => dateObj.date),
      scrollButtonsPosition: 'far',
      selectedDates: ['2020-01-01'],
      headerTemplate: 'headerTemplate',
      tooltipTemplate: 'tooltipTemplate',
      tooltip: true
    };
  }
});
window.onload = function () {
  const calendar = document.querySelector('smart-calendar'), descriptionInput = document.getElementById('descriptionInput'), dateRangeInput = document.getElementById('dateRangeInput'), eventWindow = document.getElementById('eventWindow');
  let eventDetails = null;
  calendar.selectionMode = 'none';
  //Handle Calendar Header buttons
  calendar.addEventListener('click', function (event) {
    let target = event.target;
    if (target.closest('.event-window-button')) {
      eventWindow.open();
    }
    target = target.closest('smart-button');
    if (!target) {
      return;
    }
    switch (target.id) {
      case 'next':
        calendar.navigate(12);
        break;
      case 'previous':
        calendar.navigate(-12);
        break;
      case 'today':
        const today = new Date();
        today.setDate(1);
        today.setMonth(0);
        calendar.navigate(today);
        break;
      case 'month':
        calendar.displayMode = 'month';
        break;
      case 'year':
        calendar.displayMode = 'year';
        break;
      case 'decade':
        calendar.displayMode = 'decade';
        break;
    }
  });
  //Set the primary button for the current display mode
  calendar.addEventListener('displayModeChange', function () {
    const displayMode = calendar.displayMode, viewSelection = document.querySelector('.view-selection'), viewSelectionButtons = viewSelection.querySelectorAll('smart-button');
    for (let i = 0; i < viewSelectionButtons.length; i++) {
      const button = viewSelectionButtons[i];
      if (button.id !== displayMode) {
        button.classList.remove('primary');
      }
      else {
        button.classList.add('primary');
      }
    }
  });
  //Handle Tooltip and prepare editor window
  calendar.addEventListener('open', function (event) {
    const tooltip = event.detail.target;
    if (!(tooltip instanceof window.Smart.Tooltip)) {
      return;
    }
    eventDetails = getImportantDate(event.detail.value);
    if (eventDetails) {
      tooltip.value = eventWindow.label = descriptionInput.value = eventDetails.description;
      dateRangeInput.value = eventDetails;
    }
  });
  //Create new Event on DoubleClick
  calendar.addEventListener('dblclick', function (event) {
    const target = event.target, calendarCell = target.closest('.smart-calendar-cell');
    if (calendarCell) {
      const cellDate = new Date(calendarCell.value);
      eventDetails = getImportantDate(cellDate) || { from: cellDate, description: 'New Event' };
      eventWindow.label = descriptionInput.value = eventDetails.description;
      dateRangeInput.value = eventDetails;
      eventWindow.open();
    }
  });
  //Delete Event
  document.getElementById('buttonDelete')?.addEventListener('click', function () {
    if (!eventDetails) {
      eventWindow.close();
      return;
    }
    importantDatesData = importantDatesData.filter(dateObj => dateObj.description !== eventDetails.description);
    calendar.importantDates = importantDatesData.map(dateObj => dateObj.date);
    eventWindow.close();
  });
  //Cancel Event Editing
  document.getElementById('buttonCancel')?.addEventListener('click', function () {
    eventWindow.close();
    eventDetails = null;
  });
  //Save Event
  document.getElementById('buttonSave')?.addEventListener('click', function () {
    if (!eventDetails) {
      eventWindow.close();
      return;
    }
    importantDatesData = importantDatesData.filter(dateObj => dateObj.description !== eventDetails.description);
    const newDateRange = dateRangeInput.value;
    if (!newDateRange) {
      return;
    }
    const newImportantDates = getImportantDates([{ dateFrom: newDateRange.from, dateTo: newDateRange.to, description: descriptionInput.value || '' }]);
    importantDatesData = importantDatesData.concat(newImportantDates);
    calendar.importantDates = importantDatesData.map(dateObj => dateObj.date);
    eventWindow.close();
  });
};
