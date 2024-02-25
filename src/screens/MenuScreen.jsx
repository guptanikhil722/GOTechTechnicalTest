import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import NavBar from './NavBar';
import {Trash} from 'react-bootstrap-icons';
import { getMainMenus, getSubMenus} from '../GraphQl/Queries';
import { addUpdateStoreMenu } from "../GraphQl/Mutations";

const  MenuScreen=() =>{
    const { error, loading, data } = useQuery(getMainMenus);
    const { error:subMenuerror, loading:subMenuloading, data:subMenudata } = useQuery(getSubMenus);
    const [addUpdate, { errorAdd, addSuccess }] = useMutation(addUpdateStoreMenu);
    const [mainMenus, setMainMenus] = useState([]);
    const [subMenus, setSubMenus] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subMenuObj, setSubMenuObj] = useState({ name:'Sub Menu',
    displayOrder: 'Display Order', id:'0'})
    const [mainCat, setMaincat] = useState()
    const [childCatArr, setChildCatArr] = useState([])
    const [displayOrder, setDisplayOrder] = useState(0)
    // const [count, setCount]= useState();
    useEffect(() => {
      if (data) {
        setMainMenus(data.mainCategoriesAdmin.list);
      }
    }, [data]);
    useEffect(() => {
      if (subMenudata) {
        setSubCategories(subMenudata.categoriesMerchant.list);
      
    }}, [subMenudata]);

    const addSubMenus = (count) =>{
        let subMenu = subMenus.length==0? [] : subMenus
        setSubMenuObj(
            { name:'Sub Menu',
    displayOrder: 'DisplayOrder', id:`${subMenus.length+1}`}
        )
        subMenu.push(subMenuObj)
        // console.log(subMenu)
        setSubMenus(subMenu)
    }
    const removeSubMenus = (item, index) => {
        setSubMenus(prevSubMenus => {
            const newArr = [...prevSubMenus]; // Create a copy of the current subMenus array
            const index = newArr.indexOf(item);
            if (index > -1) {
                newArr.splice(index, 1);
            }
            return newArr; // Return the updated array
        });
        removeSubCategory(index)
    }
    const handleSubmit = () =>{
      console.log('main_cat_id>>>', mainCat)
      console.log('child_cats_obj>>>', childCatArr)
      if(!mainCat){
        alert('please select main category !')
      }else if(subMenus.length>0 && childCatArr.length == 0){
        alert('please select sub category !')
      }else{
      addUpdate({
        variables: {
          main_cat_id: parseInt(mainCat),
          child_cats_obj: childCatArr,
          store_id: 21,
        },
      });
      if (errorAdd) {
        console.log(error);
      }else{
        alert('Added Successfully')
      }
    }
     
    }
    const addSubCategory = (e) =>{
     
      if(!mainCat){
        alert('please select main category !')
      
      }else{
        var item = {}
        let subMenuArr = childCatArr.length == 0 ?[]: childCatArr
        item['child_cat_id'] = parseInt(e.target.value)
        item['display_order'] = parseInt(displayOrder)
        item['menu_item_id'] = parseInt(mainCat)
        subMenuArr.push(item)
        setChildCatArr(subMenuArr)
      }
    }
    const removeSubCategory = (e) =>{
      setChildCatArr(prevSubcategories => {
        const newArr = [...prevSubcategories]; // Create a copy of the current subMenus array
        // const index = newArr.indexOf(e);
        if (e > -1) {
            newArr.splice(e, 1);
        }
        return newArr; // Return the updated array
    });
    }
  return (
    <div className='menuPage'>
     <h1 className='menuScreenTitle'>Create Route</h1>
    <NavBar/>
     <Form >
     
    <Row className="mb-1">
    <Form.Group >
    <Form.Label>Main Menu 
      <span className="asterik">*</span>
    </Form.Label>
        <Form.Select aria-label="Default select example" defaultValue='Select...' la className='custom-select' value={mainCat} onChange={(e)=>{setMaincat(e.target.value)}}>
                <option>Select...</option>
                
      {mainMenus.map((item, index)=>(
        <option value={item.id} key={index}>{item.category_title}</option>
  ))}
    </Form.Select>
    </Form.Group>
    </Row>
    <Row className="mb-3">
        

       {subMenus.length!==0 ? subMenus.map((item,index)=> (
        <>
       <Form.Group as={Col} sm={3} className="form-field mt-2 mb-2" controlId="formGridState">
          <Form.Label>{item.name}
          <span className="asterik">*</span>
          </Form.Label>
          <Form.Select defaultValue="Select..."  onChange={(e)=>addSubCategory(e)}>
            <option>Select...</option>
            {subCategories.map((item, index)=>(
        <option value={item.id}>{item.category_title}</option>
  ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} sm={3} className="form-field mt-2 mb-2" controlId="formGridZip">
          <Form.Label>{item.displayOrder}
          <span className="asterik">*</span></Form.Label>
          <Form.Control value={displayOrder} type="number"  onChange={(e)=>setDisplayOrder(e.target.value)}/>
        </Form.Group>
      <a as={Col}  sm={1} className="icons" onClick={()=>removeSubMenus(item, index)}>
        <Trash  size={20} color='red' />
        </a>
        {/* </div> */}
        </>
        )): <></>}
        <Button  as={Col} sm={3} className="addNewSubMenu right" onClick={addSubMenus}>
        Add New Submenu
        </Button>
      </Row>
     
      <Button  as={Col}  className="addNewSubMenu center" onClick={handleSubmit}>
       Save
      </Button>
   
      </Form>
    </div>
  )
}

export default MenuScreen