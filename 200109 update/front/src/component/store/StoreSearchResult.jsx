import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class StoreSearchResult extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount () {
      this.setState({
        list: this.props.data
      })
    }


    // componentDidUpdate(prevProps) {
    //     if (this.props.data !== prevProps.data){
    //         this.setState({
    //             list: this.props.data
    //         })
    //     }
    // }

    render () {
        const list = this.state.list;
        return (
            <div>
                {list.map (row => 
                <Table key={row.ownerNo} style={{width: "800px"}}>
                <colgroup>
                  <col style={{ width: "200px" }} />
                  <col style={{ width: "600px" }} />
                </colgroup>
                <TableBody>
                  <TableRow >
                    <td style={tablestyle}>음식점 이름 </td>
                    <td style={tablestyle}>{row.storeName}</td>
                  </TableRow>
                  <TableRow>
                    <TableCell>음식 종류</TableCell>
                    <TableCell>{row.mainMenu}</TableCell>
                  </TableRow>
                  
                </TableBody>
              
              </Table>
                )}
            </div>
        )
    }

}

const tablestyle={
  padding: '15px',
  color: 'black',
}

export default StoreSearchResult;