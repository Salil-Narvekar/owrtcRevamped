import React from 'react'
import { useNavigate } from "react-router-dom";
import ButtonSmall from '../ButtonSmall';

const AssignmentPlate = ({ assignmentId, assignmentTitle, creationDate, startingDate, deadlineDate, assignmentType, onShowTeamClick }) => {

  const navigate = useNavigate();
  const titleColor = assignmentType === 'Changes' ? 'text-red-600' : 'text-sky-700'

  return (
    <div className='grid sm:grid-rows-3 gap-1 justify-items-start border border-slate-300 rounded-lg h-full max-h-32 py-2 pl-2 pr-2'>

      <div className={`text-sm md:text-md lg:text-lg ${titleColor} font-bold`}>{assignmentTitle}</div>

      <div className='grid grid-cols-3 grid-rows-2 justify-items-start items-center w-full'>
        <span className='font-semibold text-xs'>Created</span>
        <span className='font-semibold text-xs'>Started</span>
        <span className='font-semibold text-xs'>Deadline</span>
        <span className='text-gray-500 text-xs font-bold'>{creationDate}</span>
        <span className='text-green-600 text-xs font-bold'>{startingDate}</span>
        <span className='text-amber-600 text-xs font-bold'>{deadlineDate}</span>
      </div>

      <div className='grid grid-flow-col justify-start items-center gap-1'>

        <ButtonSmall
          buttonLable="Video"
          name="videoCall"
          color='green'
          onClick={() => navigate(`/videoCall/${assignmentId}`)}
        />

        <ButtonSmall
          buttonLable="Edit"
          name="edit"
          color='green'
          onClick={() => navigate(`/assignmentForm/${assignmentId}`)}
        />

        <ButtonSmall
          buttonLable="Show Team"
          name="team"
          color='sky'
          onClick={onShowTeamClick}
        />
      </div>
    </div>
  )
}

export default AssignmentPlate