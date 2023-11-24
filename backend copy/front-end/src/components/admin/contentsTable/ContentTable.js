import React from 'react';
import { useGetTermsDataQuery } from '../../../redux/adminApi';
import { Link } from 'react-router-dom'


const ContentTable = () => {
  const{data, isLoading, isError} = useGetTermsDataQuery();
  // console.log(data.data[0].termsData);
  const termsData = data && data.data && data.data[0] && data.data[0].termsData;

  return (
    <div className="container mt-5">
    <table className="table table-bordered text-center rounded">
      <thead >
        <tr className='bg-primary text-white'>
          <th>S.No</th>
          <th>Title</th>
          <th>Content</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>terms</td>
          <td> <div dangerouslySetInnerHTML={{ __html: termsData || "" }} /></td>
          <td>
            <Link to={'/admin'} className="btn btn-primary">Edit</Link>
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
  )
}

export default ContentTable