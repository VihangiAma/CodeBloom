import Package from '../Models/Packages.js';

// ✅ Get all packages
export async function getPackages(req, res) {
    try {
        const packages = await Package.find();
        res.status(200).json({
            message: "Packages retrieved successfully",
            count: packages.length,
            packages
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve packages",
            error: error.message
        });
    }
}

// ✅ Create a new package
export async function createPackage(req, res) {
    try {
        const { PackageName, PackagePrice, PackageItems, PackageFeatured, PackageImage } = req.body;
        
        const newPackage = new Package({
            PackageName,
            PackagePrice,
            PackageItems,
            PackageFeatured,
            PackageImage
        });

        await newPackage.save();
        
        res.status(201).json({
            message: "Package created successfully",
            package: newPackage
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create package",
            error: error.message
        });
    }
}

// ✅ Update a package
export async function updatePackage(req, res) {
    try {
        const { id } = req.params;
        const { PackageName, PackagePrice, PackageItems, PackageFeatured, PackageImage } = req.body;

        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            {
                PackageName,
                PackagePrice,
                PackageItems,
                PackageFeatured,
                PackageImage
            },
            { new: true } // Returns the updated document
        );

        if (!updatedPackage) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json({
            message: "Package updated successfully",
            package: updatedPackage
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update package",
            error: error.message
        });
    }
}

// ✅ Delete a package
export async function deletePackage(req, res) {
    try {
        const { id } = req.params;
        const deletedPackage = await Package.findByIdAndDelete(id);

        if (!deletedPackage) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.status(200).json({
            message: "Package deleted successfully",
            package: deletedPackage
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete package",
            error: error.message
        });
    }
}