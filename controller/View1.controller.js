sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "odataproject/model/formatter",
    "sap/ui/export/Spreadsheet",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,formatter,SpreadSheet,MessageBox,Filter,Sorter) {
        "use strict";

        return Controller.extend("odataproject.controller.View1", {

            f:formatter,

            onInit: function () {
                // var empModel = this.getOwnerComponent().getModel("empModel");

                // var oModel= this.getOwnerComponent().getModel("oModel");
                // oModel.read("/EmployeeSet",{
                //     success:function(data){
                //         for(var i=0;i<data.results.length;i++){
                //             data.results[i].SNo=i+1;
                //         }
                //         empModel.setData(data);
                //     }
                //     });

                this.mGroupFunctions = {

                    Skill:function(oContext){
                        var skill = oContext.getProperty("Skill");
                        return{
                            key:skill,
                            text:skill
                        };
                    },
                    Designation:function(oContext){
                        var desig = oContext.getProperty("Desig");
                        return{
                            key:desig,
                            text:desig
                        };
                    }
                }
                this.getOwnerComponent().readEmployees();
                // var oModel= new sap.ui.model.json.JSONModel("/model/oModel.json");

                // this.getView().setModel(oModel);
            },
            onExportToXL:function(){
                var aCols=[
                    {
                        label:"Employee ID",
                        property:"Empid"
                    },
                    {
                        label:"Employee Name",
                        property:"Name"
                    },
                    {
                        label:"Designation",
                        property:"Desig"
                    },
                    {
                        label:"Skill",
                        property:"Skill"
                    },
                    {
                        label:"Phone",
                        property:"Phone"
                    },
                    {
                        label:"Salary",
                        property:"Salary",
                        type:"Number",
                        delimiter:true,
                        scale:2
                    },
                    {
                        label:"Email",
                        property:"Email",
                        
                    },
                    {
                        label:"Date of joining",
                        property:"Doj",
                        type:"Date",
                        format:"dd-MM-yyyy"
                    }
];
            var oSettings={
                workbook:{
                    columns:aCols
                },
                dataSource:this.getOwnerComponent().getModel("empModel").getData().results,
                fileName:"Employees.xlsx"
            };
            var oSpreadSheet = new SpreadSheet(oSettings);
            oSpreadSheet.build().then(function(){
                MessageBox.success("Table exported successfully");
            }).finally(function(){
                oSpreadSheet.destroy();
            });

            },
            //pressing a table row using json
            // onPressRow(oEvent){
            //     // var rowPress = oEvent.getSource().getBindingContext("JSONEmployees").getProperty("Name");
            //     alert("rowPress");
            // },
            //pressing a table row using odata
           onPressRow(oEvent){
                var empId = oEvent.getSource().getBindingContext("empModel").getProperty("Empid");
                this.getOwnerComponent().getRouter().navTo("RouteView2",{key:empId});

                 
           },
           onPressCreate(){
                this.getOwnerComponent().getRouter().navTo("RouteView3",{
                    key:"C"
                });
                
           },
           onPressEdit(){
            var eId=this.getView().byId("table01").getSelectedItem().getBindingContext("empModel").getProperty("Empid");
              this.getOwnerComponent().getRouter().navTo("RouteView3",{key:eId});
              
           },
            
            onSelection(oEvent){
                var selbox = oEvent.getParameter("selctedItem").getKey();
                var selctionbox = this.getView().byId("idSel").getSelectedKey();

            },
            onComboBox(oEvent){
                    var onCombo = oEvent.getParameter("selctedItem").getKey();
                    var combobox = this.getView().byId("idCb").getSelectedKey();
                   
            },
            onMulticombo(){
                var onmulti = this.getView().byId("idMb").getSelectedKeys();
            },

            onSubmit(){
                 //reading the data from the ui elements
                 var selctionbox= this.getView().byId("idSel").getSelectedKey();
                 var combobox= this.getView().byId("idCb").getSelectedKey();
                 var multicombobox= this.getView().byId("idMb").getSelectedKeys();
                 var radiobutton = this.getView().byId("idRb").getSelectedIndex();
               
                
            },
            onValueHelp(){
                if(!this.oDialog){
                    this.oDialog = sap.ui.xmlfragment(this.getView().getId(),"odataproject.view.Fragment",this);
                    this.getView().addDependent(this.oDialog);
                }
                this.oDialog.open();
               
            },
            btnClose(){
                this.oDialog.close();
            },
            onPressRowValueHelp(oEvent){
                var rowData = oEvent.getSource().getBindingContext("empModel").getProperty("Empid");
                this.getView().byId("idEmpid").setValue(rowData);
                this.oDialog.close();
            },

            onGo(){
                    var empId = this.getView().byId("idEmpid").getValue();
                    var name = this.getView().byId("idName").getValue();
                    var desig= this.getView().byId("idDesig").getValue();
                    var aSkills= this.getView().byId("idSkill").getSelectedKeys();
                    var salary = this.getView().byId("idSalary").getValue();
                    var salaryKey = this.getView().byId("idSal").getSelectedKey();
                    var doj = this.getView().byId("idDoj").getDateValue();
                    doj = formatter.formatDateForFilter(doj);


                    var aFilters = [];

                    if(empId!==""){
                        aFilters.push(new Filter("Empid","EQ",empId ));
                    }
                    if(name!==""){
                        aFilters.push(new Filter("Name","EQ",name ));
                    }
                    if(desig!==""){
                        aFilters.push(new Filter("Desig","EQ",desig ));
                    }
                    if(aSkills.length>0){
                        var aInnerFilter = [];
                        for(var i=0;i < aSkills.length; i++){
                            aInnerFilter.push(new Filter("Skill","EQ",aSkills[i] ));
                        }                       
                        aFilters.push(new Filter(aInnerFilter,false));
                    }
                    if(salary!==""){                      
                            aFilters.push(new Filter("Salary",salaryKey,salary));
                    }
                    if(doj !== ""){
                        aFilters.push(new Filter("Doj","EQ",doj));
                    }
                    
                    // sorting logic

                    var aSorters = [];
                    //grouping goes first
                    var groupField = this.getView().byId("idGroupCombo").getSelectedKey();
                    var groupRadio = this.getView().byId("idGroupRadio").getSelectedIndex();
                    var vGroup = this.mGroupFunctions[groupField];

                    if(groupField !== "" && groupRadio !== -1){
                        aSorters.push(groupField, (groupRadio === 0)? false : true, vGroup);
                    }

                    
                    var sortField = this.getView().byId("idSortCombo").getSelectedKey();
                    var sortRadio = this.getView().byId("idSortRadio").getSelectedIndex();
                    
                
                    if(sortField !== "" && sortRadio !== -1){
                        aSorters.push(new Sorter (sortField, (sortRadio === 0)? false : true));
                    }

                    this.getOwnerComponent().readEmployees(aFilters,aSorters);

                    this.getView().byId("table01").getBinding("items").sort(aSorters);

            },
            reset(){
                this.getView().byId("idEmpid").setValue("");
                this.getView().byId("idName").setValue("");
                this.getView().byId("idDesig").setValue("");
                this.getView().byId("idSkill").setSelectedKeys([]);
                this.getView().byId("idSalary").setValue("");
                this.getView().byId("idDoj").setDateValue(null);

                this.getView().byId("idSortCombo").setSelectedKey([]);
                this.getView().byId("idSortRadio").setSelectedIndex(-1);

                this.getView().byId("idGroupCombo").setSelectedKey([]);
                this.getView().byId("idGroupRadio").setSelectedIndex(-1);


            },
            onReset(){                   
                    this.reset();
                    this.getOwnerComponent().readEmployees([],[],[]);
            }
            

        });

    });


   
    