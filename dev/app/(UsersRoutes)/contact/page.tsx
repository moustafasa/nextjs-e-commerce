"use client";
import FormLayout from "@/app/_components/Forms/FormLayout";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormButton from "@/app/_components/Forms/FormButton";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { inputs } from "./_config/inputs";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Get in Touch
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 dark:text-gray-icons">
              <FaPhone className="text-xl text-blue-600" />
              <span>+1 (234) 567-8900</span>
            </div>

            <div className="flex items-center space-x-3 dark:text-gray-icons">
              <FaEnvelope className="text-xl text-blue-600" />
              <span>support@store.com</span>
            </div>

            <div className="flex items-center space-x-3 dark:text-gray-icons">
              <FaMapMarkerAlt className="text-xl text-blue-600" />
              <span>123 Store Street, City, Country</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Business Hours
            </h3>
            <div className="space-y-2 dark:text-gray-icons">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <FormLayout
            className="mt-0"
            heading="Send us a Message"
            errors={undefined}
          >
            <Form>
              {inputs.map((input) => (
                <FormField key={input.id} input={input} errors={undefined} />
              ))}
              <FormButton label="Send Message" />
            </Form>
          </FormLayout>
        </div>
      </div>
    </div>
  );
}
