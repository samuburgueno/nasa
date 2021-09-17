import React from "react";
import { useForm, Controller } from "react-hook-form";

const CameraFilter = ({ options }) => {
    const { control } = useForm()

    return(
        <div className="tags">
            {options.map((cam) => 
                <Controller 
                    key={cam}
                    control={control}
                    name="cameras"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                        <span onClick={() => onChange(cam)} key={cam} className="tag">{cam}</span>
                    )}
                />
            )}
        </div>
    )
}

export default CameraFilter