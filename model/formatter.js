sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
],function(DateFormat,NumberFormat){
    "use strict"
    return{
        formatDateForFilter:function(Doj){
            var oDateFormatter = DateFormat.getDateTimeInstance({
                 pattern:"yyyy-MM-dd"
             },sap.ui.getCore().getConfiguration().getLocale());           
             return oDateFormatter.format(Doj);
         },
        formatDate:function(Doj){
           var oDateFormatter = DateFormat.getDateTimeInstance({
                pattern:"dd-MM-yyyy"
            },sap.ui.getCore().getConfiguration().getLocale());           
            return oDateFormatter.format(Doj);
        },

        formatCurrency:function(Salary){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                showMeasure:false,
                pattern:"#,##,##0.00"
            },sap.ui.getCore().getConfiguration().getLocale());
            return oCurrencyFormat.format(Salary);
        },

        formatSkill:function(Skill){
            if(Skill==="SAP FIORI"){
                return 'Error';
            }
            else if(Skill==="SAP FIORI/UI5"){
                return "Success";
            }
            else if(Skill==="DOT NET"){
                return "Warning";
            }         
        },

        formatDesig:function(Designation){
            if(Designation==="ASSOCIATE"){
                return Designation+" (A)";
            }
        }
    }
});