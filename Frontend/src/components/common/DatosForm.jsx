import { useForm } from 'react-hook-form'
import { Modal } from '../modals/Modal'
import { nameModal } from '../../config/nameModals'
import usePopups from '../../hooks/usePopups'
import { createTransaction, getAllCategories } from '../../service/transactions'
import { useEffect, useState } from 'react'

const DatosForm = () => {
  const { show, hide } = usePopups()
  const { DataSavedModalID, DataFormModalID } = nameModal
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getElements = async () => {
      const data = await getAllCategories()
      setCategories(data.data)
    }
    getElements()
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  // Observar el valor del input "Tipo"
  const typeValue = watch('type')

  const onSubmit = async (data) => {
    const { amount, type, category, description, date } = data

    const response = await createTransaction(
      parseFloat(amount),
      type,
      category,
      description,
      date
    )

    if (response) {
      show({
        popUpId: DataSavedModalID,
        metadata: { id: DataSavedModalID },
        pushMethod: 'prepend',
      })
      hide({
        popUpId: DataFormModalID,
        metadataId: DataFormModalID,
      })

      reset()
    } else {
      console.error('No se pudo guardar la transacción')
    }
  }

  const handleCancel = () => {
    reset()
    hide({
      popUpId: DataFormModalID,
      metadataId: DataFormModalID,
    })
  }

  return (
    <Modal
      id={DataFormModalID}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white sm:px-12 py-6 rounded-3xl shadow-lg w-[542px] h-[546px] sm:max-w-2xl space-y-6 font-onest'
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

        {/* Campo Tipo */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Tipo <span className='text-red-500'>*</span>
          </label>
          <select
            {...register('type', { required: true })}
            className='text-grisclaro w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          >
            <option value=''>Elegir</option>
            <option value='Ingreso'>Ingreso</option>
            <option value='Gasto'>Gasto</option>
          </select>
        </div>

        {/* Campo Monto */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Monto <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            {...register('amount', { required: true, min: 0.01 })}
            placeholder='$1000.00'
            className='w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          />
        </div>

        {/* Campo Categoría */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Categoría <span className='text-red-500'>*</span>
          </label>
          <select
            {...register('category', { required: true })}
            className='text-grisclaro w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          >
            <option value=''>Elegir</option>
            {typeValue === 'Ingreso' && (
              <>
                {categories['Ingreso'].subcategories.map(
                  (subcategories, index) => {
                    return (
                      <option key={index} value={subcategories}>
                        {subcategories}
                      </option>
                    )
                  }
                )}
              </>
            )}
            {typeValue === 'Gasto' && (
              <>
                {categories['Gasto'].subcategories.map(
                  (subcategories, index) => {
                    return (
                      <option key={index} value={subcategories}>
                        {subcategories}
                      </option>
                    )
                  }
                )}
              </>
            )}
          </select>
        </div>

        {/* Campo Descripción */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Descripción
          </label>
          <input
            type='text'
            {...register('description', {})}
            placeholder='Detallar(Opcional)'
            className='w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-grisclaro focus:outline-none sm:text-sm'
          />
        </div>
        {/* Campo Fecha */}
        <div className='flex items-center gap-4 pl-2'>
          <label className='w-1/3 font-medium text-gray-700 text-start'>
            Fecha <span className='text-red-500'>*</span>
          </label>
          <input
            type='date'
            {...register('date', { required: true })}
            className='text-grisclaro w-[180px] sm:w-2/3 lg:w-3/4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm'
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

export default DatosForm
