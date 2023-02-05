import { Card, Page, Layout, Stack , Select,
     Button, ButtonGroup, IndexTable, useIndexResourceState, Form, FormLayout, TextField } from "@shopify/polaris";

import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback, useEffect } from "react";
import {Redirect} from '@shopify/app-bridge/actions';
import {useNavigate} from '@shopify/app-bridge-react';
import CustomSidebar from "../components/CustomSidebar";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";




const SectionStepOne = () => {

  const [selected, setSelected] = useState('today');
  const [selected2, setSelected2] = useState('is');
  const [selected3, setSelected3] = useState('');
  const [loading, setIsLoading]= useState(false)

  const fetch = useAuthenticatedFetch();






  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const handleSelectChange2 = useCallback((value) => setSelected2(value), []);

  const options = [
    {label: 'Collections', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const condition = [
    {label: 'is', value: 'is'},
    {label: 'is not', value: 'is not'},
  ];

  const { data : { body: { data: { collections: { edges }} }}, isLoading: isLoadingTrue } =
  
  useAppQuery({ url: "/api/collections", reactQueryOptions: {

    onSuccess: () => {
        setIsLoading(true)
    }
  }})

  console.log('collections', edges)


  useEffect(()=> {
    const fetchData =  async () => {
        try {
            const response = await fetch("/api/products")
            console.log(await response.json())
    
        } catch(err){
            console.log(err)
        }
    }
       fetchData()

  },[])





//  const { selectedResources } = useIndexResourceState(data)

//   const rowMark = data.map(
//     ({ id, title, handle, vendor }, index) => 

//     (<IndexTable.Row
//           key={id}
//           id={id}
//           position={index}
//           selected={selectedResources.includes(id)}
//           >
//             <IndexTable.Cell>
//                 {title}
//             </IndexTable.Cell>
//             <IndexTable.Cell>
//                 {handle}
//             </IndexTable.Cell>
//             <IndexTable.Cell>
//                 {vendor}
//             </IndexTable.Cell>

//     </IndexTable.Row>)
 // )


 const [title, setTitle] = useState('')
 const handleTitleChange = useCallback((value) => setTitle(value), [])



 const handleSubmit = async () => {
    
    await fetch("api/products/create" , {
        title: title
    })
 }

  


  


  return (
    <Card>
                <Layout>
                  <Layout.Section>
                    <Stack>
                      <Stack.Item></Stack.Item>
                      <Stack.Item>
                        <p> { isLoadingTrue ? "loading .." : edges.map((element, index) => (
                            <li>{element.node.title}</li>
                        ))}</p>
                      <h2>Products must match all conditions</h2>
                      </Stack.Item>
                    </Stack>
                  </Layout.Section>
                  <Layout.Section>
                  <Stack>
                  <Stack.Item>
                  </Stack.Item>
                  <Stack.Item>
                  <Select
                      options={options}
                      onChange={handleSelectChange}
                       value={selected}
                    />
                  </Stack.Item>
                  <Stack.Item>
                  <Select
                      options={condition}
                      onChange={handleSelectChange2}
                       value={selected2}
                    />
                  </Stack.Item>
                  <Stack.Item >
                  <Select
                    />
                  </Stack.Item>
                 </Stack>
                  </Layout.Section>
                  <Layout.Section>
                    <ButtonGroup>
                     <h1></h1>
                     <h1></h1>
                     <Button >Preview matched products</Button>
                     <Button primary>Add product filter condition</Button>
                      </ButtonGroup>
                    </Layout.Section>
                    <Layout.Section>
                        <Card>
                            {/* <IndexTable
                                itemCount={data.length}
                                headings={[
                                    {title: 'title'},
                                    {title: 'handle'},
                                    {title: 'vendor'},
                                ]}
                                >
                                    {rowMark}

                            </IndexTable> */}
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                      type="text"
                                      value={title}
                                      onChange={handleTitleChange}
                                    />
                                <Button submit >Submit</Button>

                            </FormLayout>
                        </Form>
                    </Layout.Section>
                  <Layout.Section></Layout.Section>
                </Layout>
              </Card>
  )
}

export default SectionStepOne