import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";


function renderGridTable(meet_history) {
    const tableData = Object.entries(meet_history).map(([eventName, eventDetails]) => {
      const {
        "Age Category": ageCategory,
        "Attempts Made": attemptsMade,
        "Best C&J": bestCJ,
        "Best Snatch": bestSnatch,
        "Body Weight (Kg)": bodyWeight,
        "C&J Lift 1": cjLift1,
        "C&J Lift 2": cjLift2,
        "C&J Lift 3": cjLift3,
        "C&Js Made": cjsMade,
        "Date": date,
        "Sinclair Total": sinclairTotal,
        "Snatch Lift 1": snatchLift1,
        "Snatch Lift 2": snatchLift2,
        "Snatch Lift 3": snatchLift3,
        "Snatches Made": snatchesMade,
        "Total": total,
      } = eventDetails;
  
      return [
        eventName,
        // date,
        bodyWeight,
        // ageCategory,
        bestSnatch,
        bestCJ,
        total,
        sinclairTotal,
        snatchLift1,
        snatchLift2,
        snatchLift3,
        cjLift1,
        cjLift2,
        cjLift3,
        // snatchesMade,
        // cjsMade,
        // attemptsMade,  
      ];
    });
  
    return (
      <Grid
        data={tableData}
        columns={[
          {name:'Event Name', width:'375px'},
        //   {name:'Date'},
          {name:'Body Weight (Kg)', width:'200px'},
        //   {name:'Age Category'},
          {name:'Best Snatch', width:'150px'},
          {name:'Best C&J', width:'125px'},
          {name:'Total', width:'100px'},
          {name:'Sinclair Total', width:'175px'},
          {name:'Snatch Lift 1', width:'175px'},
          {name:'Snatch Lift 2', width:'175px'},
          {name:'Snatch Lift 3', width:'175px'},
          {name:'C&J Lift 1', width:'150px'},
          {name:'C&J Lift 2', width:'150px'},
          {name:'C&J Lift 3', width:'150px'},
        //   {name:'Snatches Made'},
        //   {name:'C&Js Made'},
        //   {name:'Attempts Made'},
        ]}
        sort={true}
        resizable={true}
        fixedHeader={true}
      />
    );
  }
  
  export default renderGridTable;