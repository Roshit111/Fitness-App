import { addEmpLeave, getEmpLeavedata, addClaim, getEmpClaimdata, getExpenseItemList, getProjectList, getEmpAttendanceData, getEmpHolidayData, empCheckData, processClaim, getClaimApproverList, productListURL, userTaskListURL, getCustomerDetailListURL, getemployeeList, userLoginURL } from "../services/ConstantServies";
import { authAxios, authAxiosFilePost, authAxiosPost } from "./HttpMethod";

export function getUserTasks(task_type, customer_id,emp_id) {
  let data = {};
  if (task_type){
      data['task_type'] = task_type;
  }
  if (customer_id){
      data['customer_id'] = customer_id;
  }
  if (emp_id){
    data['emp_id'] = emp_id;
}


  // console.log('getUserTasks', task_type, userTaskListURL, data)
  return authAxios(userTaskListURL, data)
}

export function getCustomerDetailList() {
  // console.log('getCustomerDetailList')
  return authAxios(getCustomerDetailListURL)
}

// export const getUserTasks = (type, filter, userId) => {
//   return axios.get("some-task-endpoint", { params: { type, filter, userId } });
// };
  
  export function postEmpLeave(leave_type) {
    let data = {};
    if (leave_type) {
      data['leave_data'] = leave_type;
    }
    // console.log('Data to be sent:', data);
    return authAxiosPost(addEmpLeave, data)
  
  }

  export function postClaim(claim_data) {
    let data = {};
    if (claim_data) {
      data = claim_data;
    }
    // console.log('Data to be sent:', claim_data);
    return authAxiosFilePost(addClaim, claim_data)
  }

  export function postClaimAction(claim_type) {
    let data = {};
    if (claim_type) {
      data['claim_data'] = claim_type;
    }
    // console.log('Data to be sent:', data);
    return authAxiosPost(processClaim, data)
  
  }

  export function getClaimApprover() { 
    let data = {};
    return authAxios(getClaimApproverList)
  }

  export function getEmpClaim(res) {
    let data = {
      'call_mode':res
    };
    
    // console.log(res)
    return authAxios(getEmpClaimdata, data)
  }

  export function getExpenseItem() { 
    return authAxios(getExpenseItemList)
  }

  export function getExpenseProjectList() { 
    return authAxios(getProjectList)
  }

  export function getEmpAttendance(res) {
    let data = {
      'emp_id':res.emp_id,
      'month':res.month,
      'year': res.year
    };
    // console.log('Final response data',data)
    return authAxios(getEmpAttendanceData, data)
  }

  export function getEmpHoliday(res) {
    let data = {
      'year': res.year
    };
    // console.log(data,'Final response data')
    return authAxios(getEmpHolidayData, data)
  }

  // export function postCheckIn(checkin_data) {
  //   let data = {};
  //   if (checkin_data) {
  //     data['attendance_data'] = checkin_data;
  //     // data = checkin_data;
  //   }
  //   // console.log('Data to be sent:', data);
  //   return authAxiosPost(empCheckData, data)
  // }
  export function getproductlist(name) {
    // console.log('getLeadList', name)
    return authAxios(productListURL)
  }

  export function getemployelistview() { 
    return authAxios(getemployeeList)
  }

export function customerLogin(username, password) {
  let data = {
    'mobile_number': username,
    'pin': password
  };
  return authAxiosPost(userLoginURL, data)
}