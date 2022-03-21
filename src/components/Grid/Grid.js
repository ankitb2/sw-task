import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets } from '../../features/planets/planetSlice';
import './Grid.css';
import PlanetModal from './PlanetModal';
import { useHistory } from 'react-router-dom';

const headers = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'residents_size',
  'films_size',
  'population'
]

function Grid() {

  const data = useSelector((state) => state.planets)
  const [dataObj, setDataObj] = useState()
  const dispatch = useDispatch()
  const [isModalOpen, setModalopen] = useState(false)
  const nav = useHistory()
  const [modalData, setModalData] = useState()

  useEffect(() => {
    dispatch(fetchPlanets())
  }, [])

  const toggleModal = (e) => {
    setModalData(data.value[e.target.value])
    setModalopen(!isModalOpen)
  }

  useEffect(() => {

    const obj = {
      header: [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'Residents',
        'Films',
        'population'
      ],
      values: [],
      actions: []
    }

    const newDataArray = data.value.map(items => {
      return { ...items, residents_size: 0, films_size: 0 }
    })


    newDataArray.map((e) => {

      e.residents_size = e.residents.length
      e.films_size = e.films.length

      obj.values.push(e)

    })

    obj.actions.push({
      label: 'Go to Planet info',
      action: (row) => { nav.push('/planetDetails') }
    })

    obj.actions.push({
      label: 'Go to Residents',
      action: (row) => { console.log(`redirect to grid with ${row.residents.length} Residents`) } // Not sure what this task is supposed to do
    })

    obj.actions.push({
      label: 'Planet details',
      action: (row) => { return row }
    })

    obj.actions.push({
      label: 'Go to Films',
      action: (row) => { console.log(`redirect to grid with ${row.films.length} Films`) }
    })

    setDataObj(obj)

  }, [data])


  return (
    <>
      {dataObj && <div className='table_container'>
        <table className='gridTable'>
          <thead>
            <tr>
              {headers.length && headers.map(colName => <th key={colName}>{colName}</th>)}
              {!!dataObj.actions.length && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {dataObj.values.length && dataObj.values.map((row, index) => {
              return (
                <tr key={index}>
                  {headers.map((colName) => {
                    if (typeof row[colName] === "number") {
                      return (<td align='right' key={colName}>{row[colName]}</td>)
                    } else {
                      return (<td key={colName}>{row[colName]}</td>)
                    }
                  }
                  )}
                  {!!dataObj.actions.length &&
                    <td className='gridActions'>
                      {dataObj.actions.map(({ label, action }) => {
                        if (row.residents.length) {
                          if (label === "Go to Residents") {
                            return (<button onClick={() => action(row)}>{label}</button>)
                          }
                        }
                        if (row.films.length) {
                          if (label === "Go to Films") {
                            return (<button onClick={() => action(row)}>{label}</button>)
                          }
                        }

                        if (label === "Go to Planet info") {
                          return (<button onClick={() => action(row)}>{label}</button>)
                        }

                        if (label === "Planet details") {

                          return (
                            <>
                              <button value={index} onClick={toggleModal}>
                                {label}
                              </button>
                              <div key={`${index}`} className="modal_container">
                              </div>
                            </>
                          )
                        }
                      })
                      }
                    </td>
                  }
                </tr>
              )
            })}
          </tbody>
        </table>
        {isModalOpen && <PlanetModal isModalOpen={isModalOpen} modalData={modalData} toggleModal={toggleModal}></PlanetModal>}
      </div>}
    </>
  );
}

export default Grid;