  /*global fetch*/
  // https://financialmodelingprep.com/developer/docs/


  document.getElementById("stockSubmit").addEventListener("click", function(event) {

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })


    event.preventDefault();
    const value = document.getElementById("stockInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/" + value;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let results = "";
        results += '<h2>Current price for ' + json.symbol + "</h2>";
        results += '<h2>' + formatter.format(json.price) + "</h2>"
        results += "<p>"
        results += "</p>";
        document.getElementById("stockResults").innerHTML = results;
      });
    const url2 = "https://financialmodelingprep.com/api/v3/financials/income-statement/" + value;
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        console.log(json.financials[0].Revenue);
        let incomeStatement = "<br><h3>Key information from Income Statement:</h3>"
        incomeStatement += "<div id='incState'><ul>"
        incomeStatement += "<li><b>Revenue:</b> &emsp; " +"<br>&emsp;&emsp;"+formatter.format(json.financials[0].Revenue) + "</li>"
        incomeStatement += "<li><b>Revenue Growth:</b> &emsp; "+"<br>&emsp;&emsp;"+parseFloat(json.financials[0]["Revenue Growth"]*100).toFixed(2)+"%"+"</li>"
        incomeStatement += "<li><b>COGS:</b>&emsp; "+"<br>&emsp;&emsp;"+formatter.format(json.financials[0]["Cost of Revenue"])+"</li>"
        incomeStatement += "<li><b>Net Income:</b> &emsp; "+"<br>&emsp;&emsp;"+formatter.format(json.financials[0]["Net Income"])+"</li>"
        incomeStatement += "<li><b>Net Profit Margin:</b> &emsp; "+"<br>&emsp;&emsp;"+parseFloat(json.financials[0]["Net Profit Margin"]*100).toFixed(2)+"%"+"</li>"
        incomeStatement += "<li><b>EPS:</b> &emsp; "+"<br>&emsp;&emsp;"+formatter.format(json.financials[0].EPS)+"</li>"
        incomeStatement += "</ul></div>"

        document.getElementById("forecastResults").innerHTML = incomeStatement;
      });
  });
  