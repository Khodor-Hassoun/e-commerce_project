google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(usersChart);
    function usersChart() {
      var data = google.visualization.arrayToDataTable([
        ["Users", "Number", { role: "style" } ],
        ["Clients", 2000, "#b87333"],
        ["Sellers", 500, "silver"],
        ["Products", 10000, "gold"],
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Users Insights",
        width: 500,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_users"));
      chart.draw(view, options);
}

google.charts.load("current", {packages:['corechart']});
google.charts.setOnLoadCallback(productsChart);
function productsChart() {
    var data = google.visualization.arrayToDataTable([
      ["Items", "Number", { role: "style" } ],
      ["Products", 10000, "#b87333"],
      ["Sells", 3500, "silver"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Products Insights",
      width: 500,
      height: 400,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_products"));
    chart.draw(view, options);
}