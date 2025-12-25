import Image from 'next/image';
import {Project} from '@/app/llms/organizations/types/project'
import trashCanSvg from '../../../../../public/llms/trash.svg'


export const ProjectCard: React.FC<React.HTMLAttributes<HTMLDivElement> & { project: Project, orgId: string, deleteProject: Function}> = ({ project, orgId, deleteProject, ...rest }) => {
    
  return (
    <div {...rest} className="w-full h-full flex flex-col justify-between items-center border border-gray-700 rounded-sm py-2">
      <div>Name</div>
      <p className="w-2/3 flex overflow-hidden hover:overflow-auto">{project.name}</p>
      <div className="flex justify-center">
      </div>
      <div>
        <button className="w-8 h-8 flex relative hover:cursor-pointer" onClick={() => deleteProject(project.id)}>
          <Image className="object-contain" src={trashCanSvg} alt="trash can" fill/>
        </button>
      </div>
    </div>
  )
};
