import * as React from 'react';
import {useHistory} from 'react-router';
import {useLocation} from "react-router-dom";
import {useEffect, useCallback, useState} from "react"

interface FilterSubcategoryItemProps {
    data: [(string | Boolean),  (string | Boolean)],
    category: string
}
interface ColorProps {
    fontColor: ("gray" | "green"),
    setColor: React.Dispatch<React.SetStateAction<"gray" | "green">>
}

const FilterSubcategoryItem: React.FC<FilterSubcategoryItemProps> = ({data, category}) => {
    const history = useHistory();
    const location = useLocation();
    const [fontColor, setColor] = useState<ColorProps["fontColor"]>("gray")

    const setParams = () => {
        const currentParams = location.search.replace("?", "");
        if (currentParams) {
            const paramsArray = currentParams.split("&").map(splitee => splitee.split("="));
            let paramsDouble: {key: string, value: (string)[]}[] = paramsArray.map(param => ({key: param[0], value: param[1].toString().split("|")}));
            let  updatedParams:string[] = [];
            let paramTrue: Boolean = false;

            paramsDouble.forEach(param => {
                if (param.key === category.toLowerCase().replace(" ", "_")) {
                    if (param.value.indexOf(data[1].toString()) === -1) {
                        if (!["true", "false"].includes(data[1].toString())) {
                            param.value.push(data[1].toString());
                            updatedParams.push(`${param.key}=${param.value.join("|")}`);
                        } else {
                            updatedParams.push(`${param.key}=${data[1].toString()}`);
                        }
                    } else {
                        const removedValue = param.value.filter(par => par !== data[1].toString());
                        if (removedValue.length > 0) {
                            updatedParams.push(`${param.key}=${removedValue.join("|")}`);
                        } 
                        setColor("gray")
                    }
                    paramTrue = true;
                }  else {
                    updatedParams.push(`${param.key}=${param.value.join("|")}`)
                }    
            })

            if (paramTrue === false) {            
                    updatedParams = [`${currentParams}&${category.toLowerCase().replace(" ", "_")}=${data[1]}`]
            }

            history.push({search: updatedParams.join("&")});
        } else {
            history.push({search: `${category.toLowerCase().replace(" ", "_")}=${data[1]}`});
        }
    }

    const setFilters = useCallback(() => {
        const currentParams = location.search.replace("?", "");
        if (currentParams) {
            const paramsArray = currentParams.split("&").map(splitee => splitee.split("="));
            let paramsDouble: {key: string, value: (string)[]}[] = paramsArray.map(param => ({key: param[0], value: param[1].toString().split("|")}));
            paramsDouble.forEach(param => {
                if (!["true", "false"].includes(data[1].toString())) {
                    if (param.value.includes(data[1].toString())){
                        setColor("green")
                    } 
                } else {
                    setColor("gray")
                    if (param.value.includes(data[1].toString())){
                        setColor("green")
                    } 
                }
            })
        }
    }, [location, data])

    useEffect(() => {setFilters()}, [setFilters])

    return (
        <div className="filter-subcategory-item_wrapper">
            <button className="filter-subcategory-item_button" onClick={setParams} style={{color: fontColor}}>{data[0]}</button>
        </div>
    )
}

export default FilterSubcategoryItem