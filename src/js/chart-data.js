export const chartData = {
  type: 'bar',
  data: {
    datasets: [{
      order: 2,
      type: 'bar',
      label: 'Receivable',
      data: [730, 492.5, 120, 4732.5, 2760.85, 1211],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }, {
      order: 3,
      type: 'bar',
      label: 'Past Due',
      data: [2760.85, 3005, 1562, 1235, 4560, 120],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
    }, {
      order: 1,
      type: 'line',
      label: 'Invoice',
      data: [1000, 1520, 2032, 3690, 4562, 1520],
      backgroundColor: 'rgba(75, 00, 150)',
      borderColor: 'rgba(75, 00, 150)',
      borderWidth: 2,
      pointRadius: 5,
      xAxisID: 'test',
      yAxisId: 'y'
    }],
    labels: ["January", "February", "March", "April", "May", "Jun"]
  },
  options: {
    scales: {
      'x':{
        axis: 'x',
        display: true,
        stacked: false,
        title: {
          display: true,
          text: 'Months'
        }
      },
      'test': {
        axis: 'x',
        display: true,
        stacked: true,
        title: {
          display: true,
          text: 'Months'
        },
        position: 'top',
        ticks: {
          crossAlign: 'center',
          padding: 0
        }
      }
    }
  }
};

export default chartData;