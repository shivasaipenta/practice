/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "odataproject/model/models",

    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("odataproject.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.readEmployees;
               
              
            },
            readEmployees(aFilters,aSorters){
                var empModel = this.getModel("empModel");

                var oModel= this.getModel("oModel");
                oModel.read("/EmployeeSet",{
                    filters:aFilters,
                    sorters:aSorters,
                    success:function(data){
                        for(var i=0;i<data.results.length;i++){
                            data.results[i].SNo=i+1;
                        }
                        empModel.setData(data);
                    }
                    });
            },
            
        });
    }
);