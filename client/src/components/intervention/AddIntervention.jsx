import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import {getStorage , ref , getDownloadURL , uploadBytesResumable} from "firebase/storage"
import {app} from "../../utils/firebase"
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/interventionApiSlice";
import { interventions } from "../../assets/data";
import { toast } from "sonner";
import CustomersList from "./CustomerList";
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddIntervention = ({ open, setOpen ,  intervention }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(intervention?.team || []);
  //customer
  const [customer, setCustomer] = useState(intervention?.customer || []);
  const [stage, setStage] = useState(intervention?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    intervention?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [title, setTitle] = useState(intervention?.title || "");
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const[createIntervention , {isLoading}] =useCreateTaskMutation();
  const[updateIntervention , {isLoading : isUpdating }] =useUpdateTaskMutation();


  const URLS=interventions?.assets ? [ ...interventions.assets] : [];
  const submitHandler = async(data) => {
    for (const file of assets) {
      setUploading(true) ;


    try {
    await uploadFile(file);
    } catch (error) {
    console.error("Error uploading file:", error. message) ;
    return ;
    } finally {
    setUploading(false);
    }


  try {
    const newData ={... data,
    assets:  [ ...URLS, , ...uploadedFileURLs],
    team,
    customer,


    stage,
    priority,
    };

    const res  = intervention?._id
    ? await updateIntervention({...newData , _id : intervention._id}).unwrap()
    : await createIntervention(newData).unwrap();

    toast.success(res.message);
    setTimeout(() => {
      setOpen(false);
    }, 500);

  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message || error.error)
  }
};











  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const uploadFile=async (file)=>{
    const storage=getStorage(app);
    const name=new Date().getTime() + file.name;
    const storageRef=ref(storage , name);
    const uploadTask=uploadBytesResumable(storageRef , file);

    return new Promise((resolve,reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot)=> {
          console.log("Uploading");

        },
        (error) =>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL)=>{
            uploadedFileURLs.push(downloadURL);
            resolve();
          })
          .catch((error) =>{
            reject(error);
          });
          }
      );
      });




  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {intervention ? "UPDATE INTERVENTION" : "ADD INTERVENTION"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
          <Textbox
  placeholder='Intervention Title'
  type='text'
  value={title}
  name='title'
  label='Intervention Title'
  className='w-full rounded'
  register={register("title", { required: "Title is required" })}
  error={errors.title ? errors.title.message : ""}
/>


            <UserList setTeam={setTeam} team={team} />
            <CustomersList setTeam={setCustomer} team={customer} label='Customer' />

            <div className='flex gap-4'>
              <SelectList
                label='Intervention Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Intervention Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddIntervention;
