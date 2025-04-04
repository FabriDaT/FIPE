import { useForm } from 'react-hook-form'
import { Modal } from '../modals/Modal'
import { nameModal } from '../../config/nameModals'
import usePopups from '../../hooks/usePopups'
import usePopup from '../../hooks/usePopup'
import { createSavingsGoal, getSavingsGoals } from '../../service/savingGoals'

const AhorrosForm = () => {
  const { show, hide } = usePopups()
  const { DataSavedModalID, AhorrosFormModalID } = nameModal
  const { activePopup } = usePopup(AhorrosFormModalID)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const { priority, name, targetAmount, createdAt, deadline } = data
    const setData = activePopup?.metadata?.change
    console.log({
      name,
      targetAmount,
      deadline,
      priority,
      createdAt,
    })
    const response = await createSavingsGoal(
      name,
      parseFloat(targetAmount),
      deadline,
      priority,
      createdAt
    )
    if (response) {
      const newData = await getSavingsGoals()
      setData(newData.data)
      show({
        popUpId: DataSavedModalID,
        metadata: { id: DataSavedModalID },
        pushMethod: 'prepend',
      })
      hide({
        popUpId: AhorrosFormModalID,
        metadataId: AhorrosFormModalID,
      })
    }

    reset()
  }

  const handleCancel = () => {
    reset()
    hide({
      popUpId: AhorrosFormModalID,
      metadataId: AhorrosFormModalID,
    })
  }

  return (
    <Modal
      id={AhorrosFormModalID}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white  sm:px-12 py-6 rounded-3xl shadow-lg w-[542px] h-[546px] sm:max-w-2xl space-y-6 font-onest'
      >
        {/* Botón de Cerrar */}
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-lg text-gray-500 hover:text-gray-800'
            onClick={handleCancel}
          >
            ✕
          </button>
        </div>

        {/* Campo Prioridad */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Prioridad <span className='text-red-500'>*</span>
          </label>
          <select
            {...register('priority', { required: true })}
            className='text-grisclaro w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          >
            <option value=''>Elegir</option>
            <option value='Alta'>Alta</option>
            <option value='Media'>Media</option>
            <option value='Baja'>Baja</option>
          </select>
        </div>

        {/* Campo Objetivo */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Objetivo<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            {...register('name', { required: true })}
            placeholder='Una laptop marca X'
            className='w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          />
        </div>

        {/* Campo Monto */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Monto <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            {...register('targetAmount', { required: true, min: 0.01 })}
            placeholder='$1000.00'
            className='w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          />
        </div>

        {/* Campo Fecha de Inicio */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Fecha Inicio<span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            {...register('createdAt', { required: true })}
            className='text-grisclaro -[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          />
        </div>

        {/* Campo Fecha de Fin */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Fecha Final<span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            {...register('deadline', { required: true })}
            className='text-grisclaro w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          />
        </div>

        {/* Mensaje de error general */}
        <div className='h-6 text-center'>
          {Object.keys(errors).length > 0 && (
            <div className='text-sm text-red-500'>
              Por favor completa el campo faltante.
            </div>
          )}
        </div>

        {/* Botones */}
        <div className='flex flex-col gap-3 font-bold sm:flex-row sm:justify-center'>
          <button
            type='submit'
            className='w-full sm:w-auto px-4 py-2 text-white bg-verde rounded-[30px] shadow-md hover:bg-gradient-to-r from-verde to-verdeoscuro'
          >
            Guardar Datos
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className='w-full sm:w-auto px-4 py-2 text-grisclaro bg-transparent border-2 border-grisclaro rounded-[30px] hover:bg-grisclaro hover:text-white hover:border-grisclaro'
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AhorrosForm
