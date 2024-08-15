import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import InterventionTitle from "../components/InterventionTitle";
import BoardView from "../components/BoardView";
import { interventions } from "../assets/data";
import Table from "../components/intervention/Table";
import AddIntervention from "../components/intervention/AddIntervention";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Interventions = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Interventions` : "Interventions"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Intervention'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <InterventionTitle label='To Do' className={TASK_TYPE.todo} />
            <InterventionTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <InterventionTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView interventions={interventions} />
        ) : (
          <div className='w-full'>
            <Table interventions={interventions} />
          </div>
        )}
      </Tabs>

      <AddIntervention open={open} setOpen={setOpen} />
    </div>
  );
};

export default Interventions;
