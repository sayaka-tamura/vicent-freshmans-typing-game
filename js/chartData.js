// Chart.JS 用データ
var typeSpeedAndValidity = {
  labels : numOfTry_array,
  datasets : [
    {
      label: "Typing Speed",                                 //項目名
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#FF0000",
      borderColor: "#FF0000",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "#FF0000",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#FF0000",
      pointHoverBorderColor: "#FF0000",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data : typing_speed_history,                     //値
      spanGaps: false,
    },
    {
      label: "mistyped",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#337AB7",
      borderColor: "#337AB7",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "#337AB7",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#337AB7",
      pointHoverBorderColor: "#337AB7",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data : validity_array,
      spanGaps: false,
    }
  ]
}

var options1={
title: {
  display: true,
  text: 'Typing Speed & Mistyped'
},
// scales: {
//   xAxes: [{
//       display: true,
//       stacked: false,
//       gridLines: {
//         display: false
//       }
//   }],
//   yAxes: [{
//       display: true,
//       scaleLabel: {
//         display: true,
//         labelString: '順位',
//         fontFamily: 'monospace',
//         fontSize: 14
//       },
//       ticks: {
//         reverse: true,
//         beginAtZero: false,
//           min: 1,
//         callback: function(value){
//             return value+'位';
//         }
//       }
//   }]
// }
}

var correctAnswerRate = {
labels : numOfTry_array,
datasets : [
  {
    label: "Correct Answer Rate",                         //項目名
    fill: false,
    lineTension: 0.1,
    backgroundColor: "#337AB7",
    borderColor: "#337AB7",
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: "#337AB7",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "#337AB7",
    pointHoverBorderColor: "#337AB7",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data : accuracy,                           //値
    spanGaps : false,
  }
]
}

var options2={
title: {
  display: true,
  text: 'Correct Answer Rate'
},
// scales: {
//   xAxes: [{
//       display: true,
//       stacked: false,
//       gridLines: {
//         display: false
//       }
//   }],
//   yAxes: [{
//       display: true,
//       scaleLabel: {
//         display: true,
//         labelString: '順位',
//         fontFamily: 'monospace',
//         fontSize: 14
//       },
//       ticks: {
//         reverse: true,
//         beginAtZero: false,
//           min: 1,
//         callback: function(value){
//             return value+'位';
//         }
//       }
//   }]
// }
}
