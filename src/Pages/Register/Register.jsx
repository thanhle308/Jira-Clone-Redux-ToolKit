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
      email: Yup.string().required("Email kh??ng ???????c ????? tr???ng").email("Email kh??ng ????ng ?????nh d???ng"),
      password: Yup.string().required("M???t kh???u kh??ng ???????c ????? tr???ng").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/, "M???t kh???u t??? 6-10 k?? t???, ph???i c?? k?? t??? th?????ng, in hoa, ?????c bi???t, s???"),
      name: Yup.string().required("T??n kh??ng ???????c ????? tr???ng").max(7, "T??n kh??ng qu?? 7 k?? t??? "),
      phoneNumber: Yup.string().required("S??? ??i???n tho???i kh??ng ???????c ????? tr???ng").min(10, "S??? ??i???n tho???i ??t nh???t ph???i 10 s??? ")
   }),
   handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch(signUpAction(values));
      console.log(values)

   },

   displayName: 'RegisterWithFormik',
})(Register);

export default connect()(RegisterWithFormik);
