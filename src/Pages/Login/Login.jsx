import React from 'react';
import './Login.css';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signInAction } from '../../redux/action/userAction'
import { NavLink } from 'react-router-dom';
const Login = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input onChange={handleChange} type="text" name="email" required="" className='mt-3'/>
          <label>Email</label>
          <div>{errors.email ? (<div className='text-danger mb-3'>{errors.email}</div>) : null} </div>
        </div>

        <div className="user-box">
          <input onChange={handleChange} type="password" name="password" required="" className='mt-3'/>
          <label>Password</label>
          <div>{errors.password ? (<div className='text-danger mb-3'>{errors.password}</div>) : null} </div>
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
          <NavLink to='/register' style={{textDecoration:'none'}}>Đăng ký</NavLink>
        </button>
      </form>

    </div>
  );
}


const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object({
    email: Yup.string().required("Tài khoản không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(signInAction(values));

    // console.log(props)
    // console.log(password)
  },

  displayName: 'LoginWithFormik',
})(Login);

export default connect()(LoginWithFormik);
