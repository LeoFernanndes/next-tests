import Image from 'next/image';
import {File} from '@/app/llms/organizations/types/file'
import trashCanSvg from '../../../../../public/llms/trash.svg'


export const FileCard: React.FC<React.HTMLAttributes<HTMLDivElement> & { file: File, orgId: string, deleteFileFunction: Function}> = ({ file, orgId, deleteFileFunction: deleteFile, ...rest }) => {
    
  return (
    <div {...rest} className="w-full h-full flex flex-col justify-between items-center border border-gray-700 rounded-sm py-2">
      <div>Name</div>
      <p className="w-2/3 flex overflow-hidden hover:overflow-auto">{file.filename}</p>
      <div className="flex justify-center">
        <button className="w-8 h-8 flex relative hover:cursor-pointer" onClick={() => deleteFile(file.id)}>
          <Image className="object-contain" src={trashCanSvg} alt="bank logo" fill/>
        </button>
      </div>
    </div>
  )
};
