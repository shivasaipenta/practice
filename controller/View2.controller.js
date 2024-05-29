 sap.ui.define([
        "sap/ui/core/mvc/Controller",      
    ],
        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller) {
            "use strict";
    
            return Controller.extend("odataproject.controller.View2", {
    
                onInit: function () {
                 
                    this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched,this);
                   },
                

                 onPatternMatched(oEvent){
                    var empId = oEvent.getParameter("arguments").key;
                    this.getView().bindElement("/EmployeeSet('" + empId + "')");

                   
                    // var oModel = this.getOwnerComponent().getModel();
                    // var empDetails = this.getOwnerComponent().getModel("empDetails");
                    // oModel.read("/EmployeeSet('" + empId + "')",{
                    //     // urlParameters:{
                    //     //     $expand:'toProjects'
                    //     // },
                    //     success(data){
                    //         empDetails.setData(data);
                    //     }
                    // });
                },
                        
                onBack(){
                    history.go(-1);
                }
    
            });
    
        });