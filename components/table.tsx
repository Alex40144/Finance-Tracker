import React from "react";

export default class Table extends React.Component {
    constructor(props){
        super(props);
        this.getKeys = this.getKeys.bind(this);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
    }
    
    getKeys = function(){
        //this gets the titles of the lists
        if (Array.isArray(this.props.data) == true) {
            return Object.keys(this.props.data[0]);
        }
        else {
            return Object.keys(this.props.data);
        }
    }
    
    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
        return <td className="text-white bg-blue px-8 py-3 border-b-2 border-gray-200" key={key}>{key}</td>
        })
    }
    
    getRowsData = function(){
        var keys = this.getKeys();
        if (keys.length == 1){
            var items = this.props.data[keys[0]];
            return items.map((row)=>{
                return <RenderRow data={row} keys={keys}/>
            })
        }
        else{
            var items = this.props.data;
            var keys = this.getKeys();
            return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
            })
        }        
        
    }
    
    render() {
    return (
        <div className="w-full">
            <table className="bg-dark m-0 w-full border-separate">
                <thead>
                {this.getHeader()}
                </thead>
                <tbody>
                {this.getRowsData()}
                </tbody>
            </table>
        </div>
    );
    }
}
const RenderRow = (props) =>{
    if (props.keys.length == 1){
        return <tr className="p-4 m-4 border-b-2 border-gray-200 text-white" key={props.data}>{props.data}</tr>
    }
    else {
        return props.keys.map((key)=>{
            return <td className="p-4 m-4 border-b-2 border-gray-200 text-white" key={props.data[key]}>{props.data[key]}</td>
        })
    }
}