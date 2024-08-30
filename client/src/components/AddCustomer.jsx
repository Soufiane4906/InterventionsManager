import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { Toaster, toast } from "sonner";
import { useRegisterCustomerMutation, useUpdateCustomerMutation } from "../redux/slices/customerApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { Dialog } from "@headlessui/react";

const AddCustomer = ({ open, setOpen, CustomerData }) => {
  let defaultValues = CustomerData ?? {};
  const { Customer } = useSelector((state) => state.auth);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
const dispatch =useDispatch();
const [addNewCustomer, {isLoading}] = useRegisterCustomerMutation();

  const [updateCustomer , {isLoading : isUpdating}] = useUpdateCustomerMutation();

  const handleOnSubmit = async (data) => {
    try {
    if(CustomerData){
      const result= await updateCustomer({...data , id : CustomerData.id}).unwrap();
      toast.success("Customer updated successfully");
      if(CustomerData?._id===Customer._id){
        dispatch(setCredentials({...result.Customer}))
      }


    }
else{const result=   await addNewCustomer({...data }).unwrap();
      toast.success("Customer addes successfully");

    }

setTimeout(() => {
  setOpen(false);

}, 1500);
//relaod page



    } catch (error) {
      console.log(error);
      toast.error("something wrong")
    }



  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {CustomerData ? "UPDATE PROFILE" : "ADD NEW Customer"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />

            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />


          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Submit'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddCustomer;
