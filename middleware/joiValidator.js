const validate = (schema) => (req, res, next) => {



    const options = {
      abortEarly: false, // collect all errors
      allowUnknown: false, // disallow unknown keys that are not in the schema
      stripUnknown: true // remove unknown keys from the validated data
    }

       const {error, value} = schema.validate(req.body, options);

       if(error){
        const errorMessage = error.details.map(detail => detail.message);

        return res.status(400).json({
          status: 'error',
          type:"ValidationFailed",
          message:"Invalid data submitted.  See details for errors.",
          details: errorMessage
        });
       }

        // Replace the request body with the validated/sanitized value
        req.body = value;
        
        next();

}

export { validate };