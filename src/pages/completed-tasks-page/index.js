import Button from "../../components/button";
import { UilCheckCircle, UilApps, UilListUl } from '@iconscout/react-unicons'
import ModalWindow from "../../components/modal-window";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from '../../redux/modal-slice/index';
import TaskCard from "../../components/task-card";
import StatusBar from "../../components/status-bar";
import { setFormat } from "../../redux/format-slice";
import { useTranslation } from "react-i18next";


const CompletedPage = () => {
    const { t } = useTranslation();

    const openModal = useSelector(state => state.modal.openModal);
    const taskCompleted = useSelector(state => state.task.taskList);
    const format = useSelector(state => state.format.format);
    const dispatch = useDispatch();

    const completedTasks = taskCompleted.filter(task => !task.completed).map(task => <TaskCard task={task} />);

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row justify-between px-20 items-baseline mb-9'>
                <div className='capitalize text-4xl font-semibold text-second-color pt-8 h-fit flex flex-row items-end gap-2'>
                    <UilCheckCircle size="40" className="fill-third-color" />
                    {t("completed tasks")}
                    <StatusBar />
                    <button onClick={() => {
                        dispatch(setFormat('grid'))
                    }}>
                        <UilApps size="20" className="fill-forth-color ml-3 " />
                    </button>
                    <button onClick={() => {
                        dispatch(setFormat('list'))
                    }}>
                        <UilListUl size="20" className="fill-forth-color " />
                    </button>
                </div>
                <Button handleOnClick={() => {
                    dispatch(setOpenModal(true))
                }} />
            </div>

            {openModal && <ModalWindow />}

            {(format === 'grid') ? 
                <div className="grid grid-cols-3 ml-5 mr-20">
                    {completedTasks}
                </div>: 
                <div className="flex flex-col ml-5 mr-20 w-1/2">
                    {completedTasks}
                </div>
            }

        </div>
    )
}
export default CompletedPage;