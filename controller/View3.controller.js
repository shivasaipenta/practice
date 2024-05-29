 sap.ui.define([
        "sap/ui/core/mvc/Controller",      
    ],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller) {
            "use strict";
    
            return Controller.extend("odataproject.controller.View3", {
    
                onInit: function () {
                    this.getOwnerComponent().getRouter().getRoute("RouteView3").attachPatternMatched(this.onPatternMatched,this);

                   },

                   onPatternMatched(oEvent){
                    var empid=oEvent.getParameter("arguments").key;
                    if(empid==="C"){
                        this.getView().byId("page3").setTitle("Create a new Employee");
                    }
                    else{
                    this.getView().byId("page3").setTitle("Edit an Employee " + empid);

                    var oModel = this.getOwnerComponent().getModel();

                    var createNupdate = this.getOwnerComponent().getModel("createNupdate");

                    oModel.read("/EmployeeSet('" + empid + "')", {
                        success: function(data){
                            createNupdate.setData(data);
                        }

                    });
                    }
                   },
                 
                onBack(){
                    history.go(-1);
                }
    
            });
    
        });