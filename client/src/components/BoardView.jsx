import React from "react";
import InterventionCard from "./InterventionCard";

const BoardView = ({ interventions }) => {
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {interventions.map((intervention, index) => (
        <InterventionCard intervention={intervention} key={index} />
      ))}
    </div>
  );
};

export default BoardView;
