import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signInAction, signUpAction } from '../../redux/action/userAction'
import { NavLink } from 'react-router-dom';
const Register = (props) => {
   const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
   } = props;
   return (
      <div>
         <div className="login-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
               <div className="user-box">
                  <input onChange={handleChange} onBlur={handleBlur} type="text" name="email" className='mt-3' />
                  <label >Email</label>
                  <div>{errors.email ? (<div className='text-danger mb-3'>{errors.email}</div>) : null} </div>
               </div>

               <div className="user-box">
                  <input onChange={handleChange} onBlur={handleBlur} type="password" name="password" className='mt-3' />
                  <label>Password</label>
                  <div>{errors.password ? (<div className='text-danger mb-3'>{errors.password}</div>) : null} </div>
               </div>
               <div className="user-box">
                  <input onChange={handleChange} onBlur={handleBlur} type="text" name="name" className='mt-3'/>
                  <label>Name</label>
                  <div>{errors.name ? (<div className='text-danger mb-3'>{errors.name}</div>) : null} </div>
               </div>
               <div className="user-box">
                  <input onChange={handleChange} onBlur={handleBlur} type="text" name="phoneNumber" className='mt-3'/>
                  <label>Phone Number</label>
                  <div>{errors.phoneNumber ? (<div className='text-danger mb-3'>{errors.phoneNumber}</div>) : null} </div>
               </div>

               <button className='btn' type='submit'>
                  <span />
                  <span />
                  <span />
                  <span />
                  Submit
               </button>
               <button className='btn ml-5' type='submit'>
                  <span />
                  <span />
                  <span />
                  <span />
                  <NavLink to='/login' style={{ textDecoration: 'none' }}>Login</NavLink>
               </button>
            </form>
         </div>
      </div>
   );
}


const RegisterWithFormik = withFormik({
   mapPropsToValues: () => ({
      email: '',
      password: '',
      name: '',
      phoneNumber: ''
   }),
   validationSchema: Yup.object({
      email: Yup.string().required("Email không được để trống").email("Email không đúng định dạng"),
      password: Yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/, "Mật khẩu từ 6-10 ký tự, phải có ký tự thường, in hoa, đặc biệt, số"),
      name: Yup.string().required("Tên không được để trống").max(7, "Tên không quá 7 ký tự "),
      phoneNumber: Yup.string().required("Số điện thoại không được để trống").min(10, "Số điện thoại ít nhất phải 10 số ")
   }),
   handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch(signUpAction(values));
      console.log(values)

   },

   displayName: 'RegisterWithFormik',
})(Register);

export default connect()(RegisterWithFormik);
