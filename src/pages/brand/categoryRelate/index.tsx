import {connect} from 'umi'

const Index = (props:any)=>{
  const {id} = props.location.query;
  debugger
  return(
    <>
      {id}
    </>
  )
}
const mapStateToProps = ( state:any)=>{

}
const mapDispatchToProps = (dispatch: any) => ({

});
export default connect(mapStateToProps,mapDispatchToProps)(Index)
